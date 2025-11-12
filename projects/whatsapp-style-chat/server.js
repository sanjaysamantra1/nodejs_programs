import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from './models/User.js';
import Message from './models/Message.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

// --- DB ---
mongoose
  .connect('mongodb://localhost:27017/nareshit_sept_2025')
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.error('MongoDB error', e));

// --- Middleware ---
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());
app.use(express.static('public'));

// --- Auth Helpers ---
function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// --- REST: Auth ---
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- REST: Users & Messages ---
app.get('/api/users', authMiddleware, async (req, res) => {
  const users = await User.find({}, { passwordHash: 0 }).sort({ name: 1 });
  res.json(users.map(u => ({ id: u._id, name: u.name, email: u.email })));
});

// fetch 1:1 conversation (both directions)
app.get('/api/messages/:userId', authMiddleware, async (req, res) => {
  const me = req.user.id;
  const other = req.params.userId;
  const messages = await Message.find({
    $or: [
      { from: me, to: other },
      { from: other, to: me }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
});

// last seen endpoint
app.get('/api/last-seen/:userId', authMiddleware, async (req, res) => {
  const uid = req.params.userId;
  const seen = lastSeen.get(uid) || null;
  res.json({ userId: uid, lastSeen: seen });
});

// --- Socket: JWT Protected ---
// Map of userId -> { socketId, name }
const onlineUsers = new Map();
const lastSeen = new Map();

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error('No token'));
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: payload.id, name: payload.name };
    return next();
  } catch (e) {
    return next(new Error('Auth failed'));
  }
});

io.on('connection', async (socket) => {
  const { id: userId, name } = socket.user;

  socket.join(userId);
  onlineUsers.set(userId, { socketId: socket.id, name });

  io.emit('online_users', Array.from(onlineUsers, ([id, v]) => ({ id, name: v.name })));

  // typing indicator
  socket.on('typing', ({ to, isTyping }) => {
    if (!to) return;
    io.to(to).emit('typing', { from: userId, isTyping: !!isTyping });
  });

  socket.on('private_message', async ({ to, content }) => {
    if (!to || !content) return;
    const msg = await Message.create({ from: userId, to, content });
    io.to(userId).emit('private_message', msg);
    io.to(to).emit('private_message', msg);
  });

  socket.on('mark_read', async ({ peerId }) => {
    await Message.updateMany({ from: peerId, to: userId, readAt: null }, { $set: { readAt: new Date() } });
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(userId);
    lastSeen.set(userId, new Date().toISOString());
    io.emit('online_users', Array.from(onlineUsers, ([id, v]) => ({ id, name: v.name })));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Server listening on :' + PORT));

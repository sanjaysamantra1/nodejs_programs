const API = {
  register: (payload) => fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json()),
  login: (payload) => fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json()),
  users: () => fetch('/api/users', { headers: authHeader() }).then(r => r.json()),
  messagesWith: (userId) => fetch('/api/messages/' + userId, { headers: authHeader() }).then(r => r.json()),
  lastSeen: (userId) => fetch('/api/last-seen/' + userId, { headers: authHeader() }).then(r => r.json()),
};

let socket = null;
let me = null;
let currentPeer = null;
let online = [];
let messages = []; // current thread only

// --- DOM refs ---
const $auth = document.getElementById('auth');
const $chat = document.getElementById('chat');
const $meName = document.getElementById('meName');
const $logoutBtn = document.getElementById('logoutBtn');
const $userList = document.getElementById('userList');
const $searchUser = document.getElementById('searchUser');
const $peerName = document.getElementById('peerName');
const $peerStatus = document.getElementById('peerStatus');
const $messages = document.getElementById('messages');
const $input = document.getElementById('messageInput');
const $send = document.getElementById('sendBtn');
const $searchMessages = document.getElementById('searchMessages');
let searchQuery = "";

// Auth tabs
const $tabLogin = document.getElementById('tabLogin');
const $tabRegister = document.getElementById('tabRegister');
const $loginForm = document.getElementById('loginForm');
const $registerForm = document.getElementById('registerForm');

$tabLogin.addEventListener('click', () => { toggleTabs('login'); });
$tabRegister.addEventListener('click', () => { toggleTabs('register'); });

function toggleTabs(which) {
  $tabLogin.classList.toggle('active', which === 'login');
  $tabRegister.classList.toggle('active', which === 'register');
  $loginForm.classList.toggle('hidden', which !== 'login');
  $registerForm.classList.toggle('hidden', which !== 'register');
}

$registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('regName').value.trim(),
    email: document.getElementById('regEmail').value.trim(),
    password: document.getElementById('regPassword').value
  };
  const res = await API.register(payload);
  if (res.token) { onAuth(res); }
  else alert(res.error || 'Registration failed');
});

$loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    email: document.getElementById('loginEmail').value.trim(),
    password: document.getElementById('loginPassword').value
  };
  const res = await API.login(payload);
  if (res.token) { onAuth(res); }
  else alert(res.error || 'Login failed');
});

$logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.reload();
});

$send.addEventListener('click', sendMessage);
$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
  handleTypingSignal();
});
$input.addEventListener('input', handleTypingSignal);

$searchUser.addEventListener('input', renderUsers);
$searchMessages.addEventListener('input', () => {
  searchQuery = $searchMessages.value.toLowerCase();
  renderMessages();
});

function authHeader() {
  const token = localStorage.getItem('token');
  return { 'Authorization': 'Bearer ' + token };
}

async function onAuth(res) {
  localStorage.setItem('token', res.token);
  me = res.user;
  $meName.textContent = me.name;
  $auth.classList.add('hidden');
  $chat.classList.remove('hidden');

  await loadUsers();
  connectSocket();
}

async function loadUsers() {
  const list = await API.users();
  window.allUsers = list.filter(u => u.id !== me.id);
  renderUsers();
}

function renderUsers() {
  const q = $searchUser.value?.toLowerCase?.() || '';
  $userList.innerHTML = '';
  const filtered = (window.allUsers || []).filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  filtered.forEach(u => {
    const li = document.createElement('li');
    li.dataset.id = u.id;
    li.className = currentPeer?.id === u.id ? 'active' : '';
    li.innerHTML = `<div class="avatar">${emojiFor(u.name)}</div><div class="name">${u.name}</div>`;
    li.addEventListener('click', () => openThread(u));
    $userList.appendChild(li);
  });
}

function emojiFor(name) {
  const code = name.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const pool = ['😀','😎','🤖','🦊','🐱','🐼','🐨','🦁','🐯','🐶','🐵','🐷','🦄','🐸'];
  return pool[code % pool.length];
}

async function openThread(peer) {
  currentPeer = peer;
  setActiveInList(peer.id);
  $peerName.textContent = peer.name;
  updatePeerStatus();
  messages = await API.messagesWith(peer.id);
  renderMessages();
  socket?.emit('mark_read', { peerId: peer.id });
}

async function updatePeerStatus() {
  if (!currentPeer) return;
  if (isOnline(currentPeer.id)) {
    $peerStatus.textContent = 'online';
  } else {
    try {
      const res = await API.lastSeen(currentPeer.id);
      if (res && res.lastSeen) {
        const d = new Date(res.lastSeen);
        $peerStatus.textContent = 'last seen ' + d.toLocaleString();
      } else {
        $peerStatus.textContent = 'last seen —';
      }
    } catch {
      $peerStatus.textContent = 'last seen —';
    }
  }
}

function setActiveInList(id) {
  document.querySelectorAll('#userList li').forEach(li => li.classList.toggle('active', li.dataset.id === id));
}

function renderMessages() {
  $messages.innerHTML = '';
  messages.forEach(m => appendMessage(m));
  $messages.scrollTop = $messages.scrollHeight;
}

function appendMessage(m) {
  const mine = m.from === me.id || m.from?._id === me.id;
  const bubble = document.createElement('div');
  bubble.className = 'bubble ' + (mine ? 'me' : 'them');
  let content = m.content;
  if (searchQuery && content.toLowerCase().includes(searchQuery)) {
    const re = new RegExp(searchQuery, 'gi');
    content = content.replace(re, match => `<mark>${match}</mark>`);
  }
  bubble.innerHTML = `
    <div class="content"></div>
    <div class="meta">${new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${mine ? (m.readAt ? ' ✓✓' : ' ✓') : ''}</div>
  `;
  bubble.querySelector('.content').innerHTML = content;
  $messages.appendChild(bubble);
}

function sendMessage() {
  const text = $input.value.trim();
  if (!text || !currentPeer) return;
  socket.emit('private_message', { to: currentPeer.id, content: text });
  $input.value = '';
  handleTypingSignal(true); // stop typing immediately after send
}

let typingTimeout = null;
let lastTypingSent = false;
function handleTypingSignal(forceStop = false) {
  if (!socket || !currentPeer) return;
  const hasText = $input.value.trim().length > 0;
  const isTyping = !forceStop && hasText;
  if (isTyping !== lastTypingSent) {
    socket.emit('typing', { to: currentPeer.id, isTyping });
    lastTypingSent = isTyping;
  }
  if (typingTimeout) clearTimeout(typingTimeout);
  if (isTyping) {
    typingTimeout = setTimeout(() => {
      socket.emit('typing', { to: currentPeer.id, isTyping: false });
      lastTypingSent = false;
    }, 1200);
  }
}

function connectSocket() {
  const token = localStorage.getItem('token');
  socket = io('/', { auth: { token } });

  socket.on('connect_error', (err) => {
    console.error('Socket error:', err.message);
    alert('Socket auth failed. Please re-login.');
  });

  socket.on('online_users', (list) => {
    online = list; // [{id,name}]
    renderUsers();
    updatePeerStatus();
  });

  socket.on('typing', ({ from, isTyping }) => {
    if (!currentPeer || from !== currentPeer.id) return;
    $peerStatus.textContent = isTyping ? 'typing…' : (isOnline(currentPeer.id) ? 'online' : $peerStatus.textContent);
    if (!isTyping) updatePeerStatus();
  });

  socket.on('private_message', (msg) => {
    const inCurrent = currentPeer && (msg.from === currentPeer.id || msg.from?._id === currentPeer.id || msg.to === currentPeer.id);
    if (inCurrent) {
      messages.push(msg);
      appendMessage(msg);
      $messages.scrollTop = $messages.scrollHeight;
      if (msg.from === currentPeer.id) {
        socket.emit('mark_read', { peerId: currentPeer.id });
      }
    }
  });
}

function isOnline(userId) {
  return online.some(u => u.id === userId);
}

// Auto-login if token exists (simple)
(async function bootstrap() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const list = await API.users();
      if (!Array.isArray(list)) throw new Error('token invalid');
      const payload = JSON.parse(atob(token.split('.')[1]));
      me = { id: payload.id, name: payload.name, email: payload.email };
      $meName.textContent = me.name;
      $auth.classList.add('hidden');
      $chat.classList.remove('hidden');
      window.allUsers = list.filter(u => u.id !== me.id);
      renderUsers();
      connectSocket();
    } catch (e) {
      localStorage.removeItem('token');
    }
  }
})();

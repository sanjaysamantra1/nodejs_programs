const express = require('express');
const app = express();
const server = app.listen(5000, () => console.log('Server Running at 5000'))
const io = require('socket.io')(server);

const mongoose = require("mongoose");
const url = "mongodb://0.0.0.0:27017/march2023";
mongoose.connect(url);

const chatSchema = new mongoose.Schema({
	nickname: String,
	msg: String,
	created: { type: String, default: Date.now }
});
const chatModel = mongoose.model('chat', chatSchema);


app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

const users = {}

io.on('connection', async function (socket) {

	let oldMsgs = await chatModel.find({});
	socket.emit('load old msgs', oldMsgs);

	socket.on('new user', function (data, callback) {
		//if(nicknames.indexOf(data) != -1){
		if (data in users) {
			callback(false);
		} else {
			callback(true);
			socket.nickname = data;
			//nicknames.push(socket.nickname);
			users[socket.nickname] = socket;
			updateNickname();
		}
	});

	socket.on('send message', async function (data, callback) {
		console.log(data)
		const msg = data.trim();
		if (msg.substr(0, 3) === '/w ') {
			msg = msg.substr(3);
			const ind = msg.indexOf(' ');
			if (ind !== -1) {
				const name = msg.substring(0, ind);
				const msg = msg.substring(ind + 1);
				if (name in users) {
					users[name].emit('whisper', { msg: msg, nickname: socket.nickname });
				} else {
					callback('Error : Enter a valid user!');
				}
			} else {
				callback('Error : Please enter message!!');
			}
		} else {
			console.log('else', socket.nickname)
			await new chatModel({ 'nickname': socket.nickname, 'msg': data }).save()
			io.sockets.emit('new message', { msg: data, nickname: socket.nickname });
			// socket.broadcast.emit('new message', data);
		}
	});

	socket.on('disconnect', function () {
		if (!socket.nickname) return;
		//nicknames.splice(nicknames.indexOf(socket.nickname),1);
		delete users[socket.nickname];
		updateNickname();
		console.log('user disconnected')
	});

	function updateNickname() {
		//io.sockets.emit('username', nicknames);
		io.sockets.emit('username', Object.keys(users));
	}
});


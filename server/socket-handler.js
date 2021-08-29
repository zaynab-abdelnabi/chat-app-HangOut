io = require('socket.io')();
const auth = require('./middlewares/auth');
const User = require('./models/user');
const Message = require('./models/message');
const users = {};


io.use(auth.socket);


/**
 * event listeners when connection to socket
 */
io.on('connection', socket => {
    onSocketConnected(socket);
    socket.on('message', data => onMessage(socket, data));
    socket.on('typing', receiver => onTyping(socket, receiver));
    socket.on('seen', sender => onSeen(socket, sender));
    initialData(socket);
    socket.on('disconnect', () => onSocketDisconnected(socket));
});


/**
 * Connected to socket
 ** emit user_status to true => متصل الآن
 */
const onSocketConnected = socket => {
    console.log('New client connected ' + socket.id);
    socket.join(socket.user.id);
    users[socket.user.id] = true;
    let room = io.sockets.adapter.rooms[socket.user.id];
    if (!room || room.length === 1) {
        io.emit('user_status', {
            [socket.user.id]: true
        })
    }
}


/**
 * Disconnected from socket
 ** emit user_status to last seen
 */
const onSocketDisconnected = socket => {
    let room = io.sockets.adapter.rooms[socket.user.id];
    if (!room || room.length < 1) {
        let lastSeen = new Date().getTime();
        users[socket.user.id] = lastSeen;
        io.emit('user_status', {
            [socket.user.id]: lastSeen
        });
    }
    console.log('Client disconnected: ' + socket.user.username);
}


/**
 * emit typing event for the sender
 * @param socket 
 * @param receiver 
 */
const onTyping = (socket, receiver) => {
    let sender = socket.user.id;
    socket.to(receiver).emit('typing', sender);
}


/**
 * Update Message data seen to true
 * @param  socket 
 * @param sender 
 */

const onSeen = (socket, sender) => {
    let receiver = socket.user.id;
    Message.updateMany({ sender, receiver, seen: false }, { seen: true }, { multi: true }).exec();
}


/**
 * Create Message Model with data
 * @param  socket 
 * @param  data
 */
const onMessage = (socket, data) => {
    let sender = socket.user.id;
    let receiver = data.receiver;
    let message = {
        sender: sender,
        receiver: receiver,
        content: data.content,
        date: new Date().getTime()
    };
    Message.create(message);
    socket.to(receiver).to(sender).emit('message', message);
};


/**
 * find Message with the userId
 * @param userId 
 * @returns {Message(userId)}
 */
const getMessages = userId => {
    let where = [
        { sender: userId }, { receiver: userId }
    ];
    return Message.find().or(where);
};


/**
 * find User with userId
 * @param userId 
 * @returns {User(userId)}
 */
const getUsers = userId => {
    let where = {
        _id: { $ne: userId }
    };
    return User.find(where).select('-password');
}


/**
 * emit event "data"
 * @param socket 
 */
const initialData = socket => {
    let user = socket.user;
    let messages = [];
    getMessages(user.id)
        .then(data => {
            messages = data;
            return getUsers(user.id);
        })
        .then(contacts => {
            socket.emit('data', user, contacts, messages, users)
        })
        .catch(() => socket.disconnect())
}
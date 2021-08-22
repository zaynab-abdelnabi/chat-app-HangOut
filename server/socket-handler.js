io = require('socket.io')();
const auth = require('./middlewares/auth');
const User = require('./models/user');
const Message = require('./models/message');


io.use(auth.socket);

io.on('connection', socket => {
    console.log('New client connected ' + socket.id);
    initialData(socket);
});

const getMessages = userId => {
    let where = [
        { sender: userId }, { recevier: userId }
    ];
    return Message.find().or(where);
};

const getUsers = userId => {
    let where = {
        _id: { $ne: userId }
    };
    return User.find(where).select('-password');
}

const initialData = socket => {
    let user = socket.user;
    let messages = [];
    getMessages(user.id)
        .then(data => {
            messages = data;
            return getUsers(user.id);
        })
        .then(contacts => {
            socket.emit('data', user, contacts, messages)
        })
        .catch(() => socket.disconnect())
}
//node Server which will handle socket io connections

const io = require("socket.io")(8000);

const users = {};

io.on('connection', socket => {
    //if new user is connected , so let other user know about that!
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //if someone sends the message broadcast it to others.
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
    //if someone left the chat
    socket.on('disconnect', function () {
        socket.broadcast.emit('leftChat', users[socket.id]);
        delete users[socket.id];
    });
});

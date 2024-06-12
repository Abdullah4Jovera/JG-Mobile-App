const socketIO = require('socket.io');
const Notification = require('./models/notificationModel');
const ChatMessage = require('./models/chatMessageModel');
const User = require('./models/userModel'); // Ensure you have the User model imported

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', async (socket) => {
        const userId = socket.handshake.query.userId;

        socket.join(userId);

        const notifications = await Notification.find({ receiver: userId, read: false }).sort('timestamp');
        notifications.forEach(notification => {
            socket.emit('newNotification', {
                message: notification.message,
                loanId: notification.entityId,
            });
        });

        await Notification.updateMany({ receiver: userId, read: false }, { read: true });

        socket.on('sendMessage', async (data) => {
            const { senderId, receiverId, message } = data;

            // Save the message to the database
            const chatMessage = new ChatMessage({
                senderId,
                receiverId,
                message
            });
            await chatMessage.save();

            const sender = await User.findById(senderId);

            io.to(receiverId).emit('newMessage', {
                senderName: sender.name,
                message: message,
                timestamp: chatMessage.timestamp // use the timestamp from the saved message
            });
        });

        socket.on('disconnect', () => {
            socket.leave(userId);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error('Socket.IO has not been initialized.');
    }
    return io;
}

module.exports = {
    initializeSocket,
    getIO
}

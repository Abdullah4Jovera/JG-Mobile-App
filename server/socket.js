const socketIO = require('socket.io');
const Notification = require('./models/notificationModel');
const BusinessFinanceLoan = require('./models/businessFinanceLoanModel'); // Ensure you have this model imported

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
                entityType: notification.entityType
            });
        });

        await Notification.updateMany({ receiver: userId, read: false }, { read: true });

        socket.on('sendMessage', (data) => {
            const { senderName, receiverId, message } = data;
            io.to(receiverId).emit('newMessage', {
                senderName: senderName,
                message: message,
                timestamp: new Date()
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
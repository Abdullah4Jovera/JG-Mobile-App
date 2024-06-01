const socketIO = require('socket.io');
const Notification = require('./models/notificationModel');

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000', // Allow requests from this origin
            methods: ['GET', 'POST'], // Allow these methods
            credentials: true // Allow credentials (cookies, authorization headers, etc.)
        }
    });

    // Handle socket connections
    io.on('connection', async (socket) => {
        const userId = socket.handshake.query.userId; // Get user ID from query

        // Join room based on user ID
        socket.join(userId);

        // Send any stored notifications
        const notifications = await Notification.find({ receiver: userId, read: false }).sort('timestamp');
        notifications.forEach(notification => {
            socket.emit('newLoanApplication', {
                message: notification.message,
                loanId: notification.entityId,
            });
        });

        // Mark notifications as read
        await Notification.updateMany({ receiver: userId, read: false }, { read: true });

        socket.on('disconnect', () => {
            socket.leave(userId); // Leave room on disconnect
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
};

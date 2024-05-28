const socketIO = require('socket.io');
const cors = require('cors');

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000', // Allow requests from this origin
            methods: ['GET', 'POST'], // Allow these methods
            credentials: true // Allow credentials (cookies, authorization headers, etc.)
        }
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

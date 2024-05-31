const express = require('express');
const http = require('http');
const socket = require('./socket'); // Path to the socket.js file
require('dotenv').config();
const cors = require('cors');
const cookieSession = require('cookie-session');
const usersRouter = require('./routes/usersRouter');
const mongoose = require('mongoose');
const personalLoanRouter = require('./routes/personalLoanRouter');
const realEstateLoanRouter = require('./routes/realEstateLoanRouter');
const mortgageLoansRouter = require('./routes/mortgageLoanRouter');
const businessFinanceLoanRouter = require('./routes/businessFinanceLoanRouter');
const loansRouter = require('./routes/loansRouter');
const videoRouter = require('./routes/videoRouter');
const contactRouter = require('./routes/contactRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const helpAndSupportRouter = require('./routes/helpAndSupportRouter');
const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(
  cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Initialize Socket.IO and pass the HTTP server
socket.initializeSocket(server);

app.use('/api/users', usersRouter);
app.use('/api/personal-loans', personalLoanRouter);
app.use('/api/businessfinance-loans', businessFinanceLoanRouter);
app.use('/api/realestate-loans', realEstateLoanRouter);
app.use('/api/mortgage-loans', mortgageLoansRouter);
app.use('/api/loans', loansRouter);
app.use('/api/videos', videoRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/helpandsupport', helpAndSupportRouter);
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));

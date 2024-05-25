require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const usersRouter = require('./routes/usersRouter')
const mongoose = require("mongoose");
const personalLoanRouter = require('./routes/personalLoanRouter');
const businessFinanceRouter = require('./routes/businessFinanceLoanRouter');
const realEstateLoanRouter = require('./routes/realEstateLoanRouter');
const mortgageLoansRouter = require('./routes/mortgageLoanRouter');
const app = express();

app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("Error connecting to MongoDB:", err));

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);




app.use(
	cors()
);

app.use("/api/users", usersRouter);
app.use("/api/personal-loans", personalLoanRouter);
app.use("/api/businessfinance-loans", businessFinanceRouter);
app.use("/api/realestate-loans", realEstateLoanRouter);
app.use("/api/mortgage-loans", mortgageLoansRouter);




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// --- Passport related imports ---
const passport = require('./services/passport');
const session = require('express-session');
// --- Passport related imports ---

// --- express-related imports
const express = require('express');
const app = express();
const port = 3000;
// --- express-related imports

const cors = require("cors");
require('dotenv').config();

app.use(express.urlencoded({
  extended: false
})

);

// Creating the routes to be used for different HTTP requests
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
let signupRouter = require('./routes/signup.js');
let userRouter = require('./routes/user.js');

// CORS on the localhost port used for the react client app
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use(express.json());


// -------------- passport --------------


// Initializing express session 
app.use(session({
  secret: [process.env.PASSPORT_SECRET],
  resave: true, 
  saveUninitialized:true
})); // session secret
// app.use(cookieParser(process.env.PASSPORT_SECRET));



// Initialize passport on every route call 
app.use(passport.initialize());

app.use(passport.session()); // allow passport to use express-session


// -------------- passport --------------



app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/user', userRouter);

// temporary test route to check for valid session after login
app.get('/currentuser', (req, res) => {
  res.send(req.user);
});



// Temporary route to test on the serverside if the session is established and the user is authenticated
// via passport.js
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome, ${req.user.email}! This is your dashboard.`);
  } else {
    res.redirect('/login');
  }
});
module.exports = app;
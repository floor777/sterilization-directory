// --- Passport related imports ---
const passport = require('./services/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
// --- Passport related imports ---

// --- express-related imports
const express = require('express');
const app = express();

// --- express-related imports

const cors = require("cors");
require('dotenv').config();


app.use(express.urlencoded({
  extended: false
})

);

// Creating the routes to be used for different HTTP requests

let authRouter = require('./routes/auth');
let userRouter = require('./routes/user.js');
let markerRouter = require('./routes/marker.js');
let reviewRouter = require('./routes/review.js');

// CORS on the localhost port used for the react client app
app.use(cors({
  origin: "http://localhost:80",
  credentials: true
}));




app.use(express.json());


// -------------- passport --------------


// Initializing express session 
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true, 
  saveUninitialized:true,
  cookie: {
    sameSite: 'none',
    secure: true,
  }

})); // session secret
app.use(cookieParser(process.env.PASSPORT_SECRET));




// Initialize passport on every route call 
app.use(passport.initialize());

app.use(passport.session()); // allow passport to use express-session


// -------------- passport --------------
app.set("trust proxy", 1);


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/marker', markerRouter);
app.use('/review', reviewRouter);

app.get('/', (req, res) => {
  res.send('a');
});



module.exports = app;
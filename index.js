// --- Passport related imports ---
const passport = require('./services/passport');
const LocalStrategy = require("passport-local").Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const argon2 = require('argon2');

// --- Passport related imports ---

// --- express-related imports
const express = require('express');
const app = express();
const port = 3000;
// --- express-related imports

// --- db/sequelize-related imports
const Sequelize = require("sequelize");
const db = require('./services/db.js');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('CFS');
Sequelize.useCLS(namespace);
// --- db/sequelize-related imports




const cors = require("cors");
require('dotenv').config();


app.use(express.urlencoded({
  extended: false
})

);
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
let signupRouter = require('./routes/signup.js');
const { User } = require('./models/user.model');


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))



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
app.use('/login', authRouter);
app.use('/signup', signupRouter);

app.get('/currentuser', (req, res) => {
  res.send(req.user);
}) 




app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome, ${req.user.email}! This is your dashboard.`);
  } else {
    res.redirect('/login');
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


 db.sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
 }).catch((error) => {
   console.error('Unable to connect to the database: ', error);
 });

 module.exports = app;
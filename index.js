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
  extended: true 
})

);
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
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


app.use(cookieParser(process.env.PASSPORT_SECRET));

// Initialize passport on every route call 
app.use(passport.initialize());

app.use(passport.session()); // allow passport to use express-session


// -------------- passport --------------



app.use('/', indexRouter);
app.use('/login', authRouter);

app.get('/currentuser', (req, res) => {
  console.log(req.user)
}) 
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
      

    // NEED TO CALL req.login()!!!
    req.login(user, next);
    console.log("current req.user: " + req.user.email);
    console.log(req.session.id);
  })(req, res, next);
}
);


  
  
app.post("/signup", async (req, res) => {

  
  db.sequelize.transaction(async () => {
    //
    
    const searchedUser = await User.findOne({
      where: {
        email: req.body.email
      },
      

    });

    if(searchedUser === null) {
      const hashedPassword =  await argon2.hash(req.body.password);
      return User.create({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        location: req.body.location
      })
    }
    else {
      console.log("User already exists")
    }

    // const [newUser, created] = User.findOrCreate(
    //   {
    //     where: {
    //       email : req.body.email,
  
    //     },
    //     defaults: {
    //       email: req.body.email,
    //       password: hashedPassword,
    //       name: req.body.name,
    //       location: req.body.location
    //     }
    //   }
    // );
    // if (created) {
    //   console.log("New user registered to the system!");
  
    // }
    // else {
    //   console.log("Email already registered in the system. Would you like to log in instead?")
    //   // console.log(newUser instanceof User); // true
    //   // console.log(newUser); // 'My Title'
      
    // }
    // res.send('test');
    // return newUser;
    
  })
  
})

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome, ${req.user.email}! This is your dashboard.`);
  } else {
    res.redirect('/login');
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/signup', (req, res) => {
    // res.send(req.body);
    console.log(res.body);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


 db.sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
 }).catch((error) => {
   console.error('Unable to connect to the database: ', error);
 });
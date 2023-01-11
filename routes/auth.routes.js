const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const User = require('../models/User.model')
const saltRounds = 10;

const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard')

/* GET Signup page */
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup", { loggedIn: false });
});

//  POST Signup page
router.post("/signup", isLoggedOut, async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }
   // make sure passwords are strong:
   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
   if (!regex.test(password)) {
     res
       .status(500)
       .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
     return;
   }

    User.findOne({ username })
     .then((user => {
        if(user)
        {
            res.render('auth/signup', { errorMessage: 'This username is already registered. Try with other username.' });
            return;
        }
     }))
    const passwordHash = await bcrypt.hash(password, saltRounds);
    User.create({username,email,password: passwordHash,})
    .then((newUser) => {
      /* req.session.currentUser = {username: newUser.username};*/
      res.redirect(`/auth/login`)
    })
    .catch(err => console.log(err))
})

router.get("/create", (req, res) => {
    console.log('create place route', req.session);
    const { currentUser } = req.session;
    console.log('Current ', currentUser);
    currentUser.loggedIn = true;
    
    res.render("place/create",currentUser)
})


 // Get Login page
router.get("/login", isLoggedOut, (req, res) => {
    console.log('SESSION =====> ', req.session);
    res.render("auth/login", { loggedIn: false })
})

// Post Login
 router.post("/login", isLoggedOut, (req, res) => {
    console.log('SESSION =====> ', req.session);
    const { email, password } = req.body;
 
//    Data validation check 
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }


  User.findOne({ email })
    .then(user => { 
        console.log('user', user)
      if (!user) { // if user is not found in the DB
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcrypt.compareSync(password, user.password)) { // if password is correct
        const { username, email } = user;
        req.session.currentUser = { username, email }; // creating the property currentUser 
        req.session.currentUser.isLoggedIn = true;
        console.log("Session details",req.session)
        res.redirect('/place/create')
        
      } else { // if password is incorect
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => console.log(error));
})  


router.post('/logout', isLoggedIn, (req, res) => {
    req.session.destroy(err => {
      if (err) console.log(err);
      res.redirect('/');
    });
  });

module.exports = router;
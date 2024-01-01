// This imports the 'express' module and assigns its functionality to the variable 'express', enabling the creation of Express applications.
const express = require('express')
// This line imports the controller functional components 'userLogin' and 'userSignup' from the 'usersController' file in the 'controllers' folder and assigns them to variables with the same names.
const {userLogin, userSignup} = require('../controllers/usersController')

// Here a new router object is initialised by calling express.Router() which is then stored in the variable named router.
const router = express.Router()

// User Routes
// This defines the route handling POST requests to the URL ('/login') to post user login data to log the user in by executing the 'userLogin' function.
router.post('/login', userLogin)
// This defines the route handling POST requests to the URL ('/signup') to post user signup data to signup the user up by executing the 'userSignup' function.
router.post('/signup', userSignup)

// This exports the 'expressRouter' instance stored in the variable 'router' enabling it to be imprted elsewhere.
module.exports = router
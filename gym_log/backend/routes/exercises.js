// This imports the 'express' module and assigns its functionality to the variable 'express', enabling the creation of Express applications.
const express = require('express')
// This imports the controller functional components 'getExercises', 'getSingleExercise', 'createExercise', 'deleteExercise' and 'updateExercise' from the 
// 'exerciseController' file in the 'controllers' folder and assigns them to variables with the same names.
const {getExercises, getSingleExercise, createExercise, deleteExercise, updateExercise} = require('../controllers/exerciseController')
// This imports the functional components 'authorisation' from the 'jwtAuthorisation' file in the 'middleware' folder.
const authorisation = require('../middleware/jwtAuthorisation')
// Here a new router object is initialised by calling express.Router() which is then stored in the variable named router.
const router = express.Router()
// Here 'router.use(authorisation) is used which will execute the middlewareFunction 'authorisation' for all routes defined after this statement within the same router.
router.use(authorisation)

// Exercise Routes
// This defines the route handling GET requests to the root URL ('/') to fetch all exercises by executing the 'getExercises' function.
router.get('/', getExercises)

// // This defines the route handling GET requests to the URL with an ID to fetch a single exercise by executing the 'getSingleExercise' function. 
// // ':id' is used which is a route parameter where the value of 'id' can change. 
// router.get('/:id', getSingleExercise)

// This defines the route handling POST requests to the root URL ('/') to post new exercises to the database by executing the 'createExercise' function.
router.post('/', createExercise)
// This defines the route handling DELETE requests to the URL with an ID to delete a single exercise by executing the 'deleteExercise' function. 
// ':id' is used which is a route parameter where the value of 'id' can change.  
router.delete('/:id', deleteExercise)
// This defines the route handling PATCH requests to the URL with an ID to update a single exercise by executing the 'updateExercise' function. 
// ':id' is used which is a route parameter where the value of 'id' can change.  
router.patch('/:id', updateExercise)
// This exports the 'expressRouter' instance stored in the variable 'router' enabling it to be imprted elsewhere.
module.exports = router
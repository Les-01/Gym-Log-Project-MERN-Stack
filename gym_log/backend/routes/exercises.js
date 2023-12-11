// This imports the 'express' module and assigns its functionality to the variable 'express', enabling the creation of Express applications.
const express = require('express')
// This line imports specific functions ('getExercises', 'getSingleExercise', 'createExercise', 'deleteExercise', 'updateExercise') from the 
// 'exerciseController' file in the 'controllers' folder and assigns them to variables with the same names.
const {getExercises, getSingleExercise, createExercise, deleteExercise, updateExercise} = require('../controllers/exerciseController')

// Here a new router object is initialised by calling express.Router() which is then stored in the variable named router.
const router = express.Router()

// Routes
// This defines the route handling GET requests to the root URL ('/') to fetch all exercises by executing the 'getExercises' function.
router.get('/', getExercises)

// This defines the route handling GET requests to the URL with an ID to fetch a single exercise by executing the 'getSingleExercise' function. 
// ':id' is used which is a route parameter where the value of 'id' can change. 
router.get('/:id', getSingleExercise)

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
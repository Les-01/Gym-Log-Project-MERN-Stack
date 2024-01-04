// This requires the file 'exerciseModel' from the 'models' folder importing it, then sets it as the value of the variable 'Exercise'.
const Exercise = require('../models/exerciseModel')
// This requires 'mongoose' then sets it as the value of the variable 'mongoose'.
const mongoose = require('mongoose')
// This requires the file 'socket' from the directory level above importing it, then sets it as the value of the variable 'socketIO' importing the socket instance.
const socketIO = require('../socket'); 
// This requires the file 'userModel' from the 'models' folder importing it, then sets it as the value of the variable 'User'.
const User = require('../models/userModel')

// This is the functional component 'getExercises'.
const getExercises = async (req, res) => {
    try {
        // This initialises the variable 'user_id' and assigns it the value off the 'user_id' property stored in the request object.
        const user_id = req.user._id;

        // This retrieves the users data from the database using the user_id.
        const user = await User.findById(user_id);
        // This declares the variable 'exercises'.
        let exercises;
        // Here an 'IF' statement is used where if the users 'rank' is admin execute the code within the if statement.
        if (user && user.rank === 'admin') {
            // Here the 'Exercise.find({})' method is used to find all of the exercises for the admin user. The '.sort' method and '-1' is used to sort the results in descending order from creation. 
            exercises = await Exercise.find({}).sort({ createdAt: -1 });
        } else {
            // Here the 'Exercise.find({user_id})' method is used to find all of the exercises that match the non admin users 'user_id'. The '.sort' method and '-1' is used to sort the results in descending order from creation. 
            exercises = await Exercise.find({ user_id }).sort({ createdAt: -1 });
        }
        // Here the server responds with status code '200' and the value of the variable 'exercises' is returned as a JSON object.
        res.status(200).json(exercises);
    } catch (error) {
        // If an error occurs during the execution of the code within the try block, it will be caught here.
        console.error("Error in getExercises:", error);
        res.status(500).json({ error: "An error occurred while fetching exercises" });
    }
};

// This is the functional component 'getSingleExercise'.
const getSingleExercise = async (req, res) => {
    try {
        // Here the variable 'id' is set to equal the value of the id of the request object.
        const {id} = req.params
        // This 'IF' statement declares that if the value of the variable 'id' is not a mongoos type of object id execute the code within the code block.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
            return res.status(404).json({error: "No exercise found"})
        }
        // Here the 'Exercise.findById' method is used to find a specific exercise by its id. 
        const exercise = await Exercise.findById(id)
        // This 'IF' statement declares that if the variable 'exercise' does is not exist or has no value execute the code within the code block.
        if(!exercise) {
            // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
            return res.status(404).json({error: "No exercise found"})
        }
        // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
        res.status(200).json(exercise)
    } catch (error) {
        // If an error occurs during the execution of the code within the try block, it will be caught here.
        console.error("Error in getSingleExercise:", error);
        res.status(500).json({ error: "An error occurred while fetching the exercise" });
    }
}

// This is the functional component 'createExercise'.
const createExercise = async (req, res) => {
    // Here the variables 'exerciseName', 'reps', and 'weight' are set to equal the value of the exerciseName, reps and weight of the request object.
    const {exerciseName, reps, weight} = req.body
    // This declares the 'emptyFormFields' variable and assigns an empty array as its value.
    let emptyFormFields = []
    // This is an 'IF' statement, if the form field 'exerciseName' does NOT have a value execute the code block.
    if(!exerciseName) {
        // Here '.push' is used to add the string 'exerciseName' as an element in the 'emptyFormFields' array.
        emptyFormFields.push('exerciseName')
    }
    // This is an 'IF' statement, if the form field 'weight' does NOT have a value execute the code block.
    if(!weight) {
        // Here '.push' is used to add the string 'weight' as an element in the 'emptyFormFields' array.
        emptyFormFields.push('weight')
    }
    // This is an 'IF' statement, if the form field 'reps' does NOT have a value execute the code block.
    if(!reps) {
        // Here '.push' is used to add the string 'reps' as an element in the 'emptyFormFields' array.
        emptyFormFields.push('reps')
    }
    if(emptyFormFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields", emptyFormFields})
    }     
    // // This 'TRY' and 'CATCH' block act as the function that adds entries to the database.
    try {
        // This initialises the variable 'user_id' and assigns it the value off the 'user_id' property stored in the request object.
        const user_id = req.user._id
        // This retrieves the users data from the database using the user_id.
        const userInfo = await User.findById(user_id);
        // This retrieves the users email from the 'userInfo' object and assigns it as the value of the variable 'email'
        const email = userInfo.email
        // Here the 'Exercise.create' method is used and passed the variables 'exerciseName', 'reps', 'weight', 'user_id' and 'email' to add the values to the database. 
        const exercise = await Exercise.create({exerciseName, reps, weight, user_id, email})
        // This calls the 'getIO' method from the socketIO module, which returns the Socket.IO instance and then applies the 'emit' method to that instance which sends the 'exerciseCreated' event to the server 
        // along with the 'exercise' object containing the data on the exercise entry to be created. 
        socketIO.getIO().emit('exerciseCreated', exercise);
        // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
        res.status(200).json(exercise)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: "Validation failed", details: error.errors });
        } else {
            console.error("Error in createExercise:", error);
            return res.status(500).json({ error: "An error occurred while creating the exercise" });
        }
    }
}

// This is the functional component 'deleteExercise'.
const deleteExercise = async (req, res) => {
    try {
        // Here the variable 'id' is set to equal the value of the id of the request object.
        const {id} = req.params
        // This 'IF' statement declares that if the value of the variable 'id' is not a mongoos type of object id execute the code within the code block.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
            return res.status(404).json({error: "No exercise found"})
        }
        // Here the 'Exercise.findOneAndDelete' method is used to find a specific exercise by its id and delete it. 
        const exercise = await Exercise.findOneAndDelete({_id: id})
        // This 'IF' statement declares that if the variable 'exercise' does is not exist or has no value execute the code within the code block.
        if (!exercise) {
            // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
            return res.status(404).json({error: "No exercise found"})
        }
        // This calls the 'getIO' method from the socketIO module, which returns the Socket.IO instance and then applies the 'emit' method to that instance which sends the 'exerciseDeleted' event to the server 
        // along with the 'id' object containing the id of the object to be deleted. 
        socketIO.getIO().emit('exerciseDeleted', id);
        // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
        res.status(200).json(exercise)
    } catch (error) {
        console.error("Error in deleteExercise:", error);
        res.status(500).json({ error: "An error occurred while deleting the exercise" });
    }
}

// This is the functional component 'updateExercises'.
const updateExercise = async (req, res) => {
    try {
        // Here the variable 'id' is set to equal the value of the id of the request object.
        const {id} = req.params
        // This 'IF' statement declares that if the value of the variable 'id' is not a mongoos type of object id execute the code within the code block.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
            return res.status(404).json({error: "No exercise found"})
        }
        // Here the 'Exercise.findOneAndUpdate' method is used to find a specific exercise by its id and update its value. 
        const exercise = await Exercise.findOneAndUpdate({_id: id}, {
            // Here the spread operator '...' is used to create a new object with all of the properties and values from req.body.
            ...req.body},
            // Here the 'new: true' option is used to guarentee the exercise object will contain the updated data after the update operation finishes enabling the updated object to be emitted in the 'exerciseUpdated' event.
            {new: true})
        // This 'IF' statement declares that if the variable 'exercise' does is not exist or has no value execute the code within the code block.
        if (!exercise) {
            // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
            return res.status(404).json({error: "No exercise found"})
        }
        // This calls the 'getIO' method from the socketIO module, which returns the Socket.IO instance and then applies the 'emit' method to that instance which sends the 'exerciseUpdated' event to the server 
        // along with the 'exercise' object containing the data on the exercise entry to be updated. 
        socketIO.getIO().emit('exerciseUpdated', exercise);
        // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
        res.status(200).json(exercise)
    } catch (error) {
        console.error("Error in updateExercise:", error);
        res.status(500).json({ error: "An error occurred while updating the exercise" });
    }
}
// This exports the controller functional components 'getExercises', 'getSingleExercise', 'createExercise', 'deleteExercise' and 'updateExercise' enabling them to be imported elsewhere.
module.exports = {getExercises, getSingleExercise, createExercise, deleteExercise, updateExercise}
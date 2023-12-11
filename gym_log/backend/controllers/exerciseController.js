// This requires the file 'exerciseModel' from the 'models' folder importing it, then sets it as the value of the variable 'Exercise'.
const Exercise = require('../models/exerciseModel')
// This requires 'mongoose' then sets it as the value of the variable 'mongoose'.
const mongoose = require('mongoose')

// This is the 'getExercises' function.
const getExercises = async (req, res) => {
    // Here the 'Exercise.find' method is used to find all of the exercises. The '.sort' method and '-1' is used to sort the results in descending order from creation. 
    const exercises = await Exercise.find({}).sort({createdAt: -1})
    // Here the server responds with status code '200' and the value of the variable 'exercises' is returned as a JSON object.
    res.status(200).json(exercises)
}

// // This is the 'getSingleExercise' function. 
const getSingleExercise = async (req, res) => {
    // Here the variable 'id' is set to equal the value of the id of the request object.
    const {id} = req.params
    // This 'IF' statement declares that if the value of the variable 'id' is not a mongoos type of object id execute the code within the code block.
    if(!mongoose.Types.ObjectId.isValid(id)) {
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
}

// This is the 'createExercise' function.
const createExercise = async (req, res) => {
    // Here the variables 'exerciseName', 'reps', and 'weight' are set to equal the value of the exerciseName, reps and weight of the request object.
    const {exerciseName, reps, weight} = req.body
    // // This 'TRY' and 'CATCH' block act as the function that adds entries to the database.
    try {
        // Here the 'Exercise.create' method is used and passed the variables 'exerciseName', 'reps' and 'weight' to to add their value to the database. 
        const exercise = await Exercise.create({exerciseName, reps, weight})
        // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
        res.status(200).json(exercise)
    } catch (error) {
        // Server responds with status code 400
        res.status(400).json({error: error.message})
    }
}

// // This is the 'deleteExercise' function.
const deleteExercise = async (req, res) => {
    // Here the variable 'id' is set to equal the value of the id of the request object.
    const {id} = req.params
    // This 'IF' statement declares that if the value of the variable 'id' is not a mongoos type of object id execute the code within the code block.
    if(!mongoose.Types.ObjectId.isValid(id)) {
        // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
        return res.status(404).json({error: "No exercise found"})
    }
    // Here the 'Exercise.findOneAndDelete' method is used to find a specific exercise by its id and delete it. 
    const exercise = await Exercise.findOneAndDelete({_id: id})
    // This 'IF' statement declares that if the variable 'exercise' does is not exist or has no value execute the code within the code block.
    if(!exercise) {
        // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
        return res.status(404).json({error: "No exercise found"})
    }
    // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
    res.status(200).json(exercise)
}

// // This is the 'updateExercises' function.
const updateExercise = async (req, res) => {
    // Here the variable 'id' is set to equal the value of the id of the request object.
    const {id} = req.params
    // This 'IF' statement declares that if the value of the variable 'id' is not a mongoos type of object id execute the code within the code block.
    if(!mongoose.Types.ObjectId.isValid(id)) {
        // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
        return res.status(404).json({error: "No exercise found"})
    }
    // Here the 'Exercise.findOneAndUpdate' method is used to find a specific exercise by its id and update its value. 
    const exercise = await Exercise.findOneAndUpdate({_id: id}, {
        // Here the spread operator '...' is used to create a new object with all of the properties and values from req.body.
        ...req.body
    })
    // This 'IF' statement declares that if the variable 'exercise' does is not exist or has no value execute the code within the code block.
    if(!exercise) {
        // Here the server responds with status code '404' and a JSON object with an error property with a string value of "No exercise found".
        return res.status(404).json({error: "No exercise found"})
    }
    // Here the server responds with status code '200' and the value of the variable 'exercise' is returned as a JSON object.
    res.status(200).json(exercise)
}
// This exports all the controller functions enabling them to be imprted elsewhere.
module.exports = {getExercises, getSingleExercise, createExercise, deleteExercise, updateExercise}
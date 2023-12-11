// This requires 'mongoose' then sets it as the value of the variable 'mongoose'.
const mongoose =require('mongoose')

// This declares the variable 'Schema' and sets its value as the 'mongoose.Schema' constructor function.
const Schema = mongoose.Schema

// This uses 'new Schema()' to create a new Schema which defines the structure of the data to be sent to the database and assigns it as the value of the variable 'exerciseSchema'.
const exerciseSchema = new Schema({
    exerciseName: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, {timestamps: true})

// This uses 'mongoose.model' which has been passed the schema through the variable 'exerciseSchema' and the string 'Exercise' to create a new model using the schema to create a collection called Exercise.
module.exports = mongoose.model('Exercise', exerciseSchema)

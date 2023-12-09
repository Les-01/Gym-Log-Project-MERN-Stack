// This is the server file

// This requires 'express' then sets it as the value of the function 'express' creating an express application.
const express = require('express')

// This requires 'mongoose' then sets it as the value of the variable 'mongoose'.
const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://Les2023:FullStackDev2023@gymlogapp.0discbh.mongodb.net/?retryWrites=true&w=majority"

// This requires the file 'exercises' in the 'routes' folder effectivly importing it, then sets it as the value of the variable 'exerciseRoutes'.
const exerciseRoutes = require('./routes/exercises')

// This declares the const type variable 'app' and sets its value as the express application.
const app = express()

// Middleware for Testing
// Here 'express.json()' function is used which when data is sent to the server via POST, PUT, or PATCH request with a Content-Type of json, this middleware function takes the raw JSON data and 
// converts it into a JavaScript object which enables the data to be worked with.
app.use(express.json())
// Here app.use method is passed the objects 'req' and 'res' and the method 'next' to create middleware that executes with each request to the server.  
app.use((req, res, next) => {
    // Here 'console.log' is used to output the 'request path and the request method in the console for testing purposes.
    console.log(req.path, req.method)
    // Here the method 'next' is used which was passed to the 'app.use' method, meaning for the code to execute past this method another 'next' must be included.
    next()
})

// Routes 
app.use('/api/exercises', exerciseRoutes)

// Database Connection
mongoose.connect(mongoURI)
    .then(() => {
        app.listen(9000, () => {
            console.log("Database connection successful, listening on port 9000.")
        })
    })
    .catch((error) => {
        console.log(error)
    })



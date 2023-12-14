// This line imports the 'express' module and assigns its functionality to the variable 'express', enabling the creation of Express applications.
const express = require('express')
// This requires 'mongoose' then sets it as the value of the variable 'mongoose'.
const mongoose = require('mongoose')

const cors = require('cors')

// This declares the variable 'mongoURI' and assigns the mongoDB connection string as it's value.
const mongoURI = "mongodb+srv://Les2023:FullStackDev2023@gymlogapp.0discbh.mongodb.net/?retryWrites=true&w=majority"
// This requires the file 'exercises' from the 'routes' folder importing it, then sets it as the value of the variable 'exerciseRoutes'.
const exerciseRoutes = require('./routes/exercises')
// This declares the const type variable 'app' and sets its value as the express application.
const app = express()

app.use (cors({
    origin: "*",
    // credentials: true ---- This allows cookies
}))

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

// Route 
app.use('/api/exercises', exerciseRoutes)

// Database Connection
// This connects to the MongoDB database using the value of the variable 'mongoURI'.
mongoose.connect(mongoURI)
    // If the database connection is successful.
    .then(() => {
        // This starts the Express app to listen on port 9000.
        app.listen(9000, () => {
            // Here 'console.log' is used to log the message "Database connection successful, listening on port 9000." indicating a successful database connection and server start.
            console.log("Database connection successful, listening on port 9000.")
        })
    })
    // If an error occurs during database connection or server start.
    .catch((error) => {
        // Here 'console.log' is used to log the error to the console for troubleshooting.
        console.log(error)
    })
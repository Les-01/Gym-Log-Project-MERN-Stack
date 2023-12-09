// This 'requires express' then sets it to equal the function 'express' creating an express application.
const express = require('express')

// Here an instance of the 'expressRouter' function is created and assignes as the value of the variable 'router'.
const router = express.Router()

// Routes
// This is a GET request to the root URL ('/') to get all the exercises. 
router.get('/', (req, res) => {
    // When the function is executed the server responds with JSON data containing the message "Get all exercises".
    res.json({mssg: "Get all exercises"})
})

// This is a GET request to the URL ('/:id') to get a single exercise. ':id' is used which is a route parameter where the value of 'id' can change. 
router.get('/:id', (req, res) => {
    // When the function is executed the server responds with JSON data containing the message "Get a single exercise".
    res.json({mssg: "Get a single exercise"})
})

// This is a POST request to the root URL ('/') to post a new exercise. 
router.post('/', (req, res) => {
    // When the function is executed the server responds with JSON data containing the message "POST a new exercise".
    res.json({mssg: 'POST a new exercise'})
})

// This is a DELETE request to the URL ('/:id') to delete a single exercise. ':id' is used which is a route parameter where the value of 'id' can change. 
router.delete('/:id', (req, res) => {
    // When the function is executed the server responds with JSON data containing the message "DELETE a single exercise".
    res.json ({mssg: 'DELETE a single exercise'})
})

// This is a PATCH request to the URL ('/:id') to update a single exercise. ':id' is used which is a route parameter where the value of 'id' can change. 
router.patch('/:id', (req, res) => {
    // When the function is executed the server responds with JSON data containing the message "UPDATE a single exercise".
    res.json ({mssg: 'UPDATE a single exercise'})
})

// This exports the 'expressRouter' instance stored in the variable 'router' enabling it to be imprted elsewhere.
module.exports = router
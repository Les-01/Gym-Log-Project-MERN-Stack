const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app"})
})

app.listen(9000, () => {
    console.log("Listening on port 9000")
})
// This requires the file 'userModel' from the 'models' folder importing it, then sets it as the value of the variable 'User'.
const User = require('../models/userModel')
// This requires 'jsonwebtoken' then sets it as the value of the variable 'JWT'.
const JWT = require('jsonwebtoken')
// This is the secret string the server will use to encrypt JSON wen tokens
const serverSecretString = 'TheQuickBrownFoxJumpedOverTheLazyDogs'

// This is the functional component 'generateJSONWebToken'.
const generateJSONWebToken = (_id) => {
    // Here 'JWT.sign' is used to generate a JSON Web Token. 
    return JWT.sign({_id}, serverSecretString, {expiresIn: '100d'})
}

// login
// This is the functional component 'userLogin'.
const userLogin = async (req, res) => {
    // Here the values stored in the request body are destructured.
    const {email, password} = req.body

    try {
        // Here the 'User.login' method is used and passed the variables 'email' and 'password' to login the user.
        const user = await User.login(email, password)
        // Here the 'generateJSONWebToken' function is called and passed the ID of the user logging in to generate a JSON webtoken that contains the users unique ID. The resulting token is assigned as the value 
        // of the variable 'token'.
        const token = generateJSONWebToken(user._id)
        // If the user login was successful set the response status to 200 and send a json object response with the 'userName', 'email' and the JSON web token 'token'.
        res.status(200).json({email, token})
    } catch (error) {
        // If the user sign up was unsuccessful set the response status to 400 and send a json object response with the 'error.message'.
        res.status(400).json({error: error.message})
    }
}

// This is the functional component 'userSignup'.
const userSignup = async (req, res) => {
    // Here the values stored in the request body are destructured.
    const {userName, email, password} = req.body
    try {
        // Here the 'User.signup' method is used and passed the variables 'userName', 'email' and 'password' to sign the user up.
        const user = await User.signup(userName, email, password)
        // Here the 'generateJSONWebToken' function is called and passed the ID of the user signing up to generate a JSON webtoken that contains the users unique ID. The resulting token is assigned as the value 
        // of the variable 'token'.
        const token = generateJSONWebToken(user._id)
        // If the user sign up was successful set the response status to 200 and send a json object response with the 'userName', 'email' and the JSON web token 'token'.
        res.status(200).json({userName, email, token})
    } catch (error) {
        // If the user sign up was unsuccessful set the response status to 400 and send a json object response with the 'error.message'.
        res.status(400).json({error: error.message})
    }
}
// This exports the controller functional components 'userLogin' and 'userSignup' enabling them to be imported elsewhere.
module.exports = {userLogin, userSignup, serverSecretString}
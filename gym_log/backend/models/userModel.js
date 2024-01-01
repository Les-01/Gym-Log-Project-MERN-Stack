// This requires 'mongoose' then sets it as the value of the variable 'mongoose'.
const mongoose = require('mongoose')
// This requires 'bcrypt' then sets it as the value of the variable 'bcrypt'.
const bcrypt = require('bcrypt')
// This requires 'validator' then sets it as the value of the variable 'validator'.
const validator = require('validator')

// This declares the variable 'Schema' and sets its value as the 'mongoose.Schema' constructor function.
const Schema = mongoose.Schema
// This uses 'new Schema()' to create a new Schema which defines the structure of the data to be sent to the database and assigns it as the value of the variable 'userSchema'.
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

// This is the 'static' user signup method 
userSchema.statics.signup = async function(userName, email, password) {
    // Form validation
    // Empty fields check
    // This 'IF' statement checks if the 'userName', 'email' or 'password' fields are empty, if they are execute the code within the statement.
    if (!userName || !email || !password) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Please fill in all fields'.
        throw Error('Please fill in all fields')
    }
    // Valid email check
    // This 'IF' statement used the validator method '!validator.isEmail' to check if the email entered is NOT a valid email. If the email is NOT valid execute the code within the statement.
    if (!validator.isEmail(email)) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Please use a valid email'.
        throw Error('Please use a valid email')
    }
    // Password strength check
    // This 'IF' statement used the validator method '!validator.isStrongPassword' to check if the password entered is NOT a strong password. If the password is NOT strong enough execute the code within the statement.
    if(!validator.isStrongPassword(password)) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Please use a stronger password'.
        throw Error('Please use a stronger password')
    }
    // Unique email check.
    // Here the 'this' keyword is used in place of 'User' to refer to the User model as the User model is not accessable from inside the static method.
    const emailExists = await this.findOne({email})
    // This 'IF' statement checks to see if the variable 'emailExists' has a value if it does execute the code within the 'IF' statement.
    if (emailExists) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Email already registered'.
        throw Error('Email already registered')
    }
    // Password hashing
    // Here 'bcrypt.genSalt' is used to generate a 'bcrypt salt' to generate a random string of characters which will be added to the end of a users password to add an additional layer of security. 
    // This salt is then assigned as the value of the variable 'bcryptSalt'.
    const bcryptSalt = await bcrypt.genSalt(10)
    // Here the 'bcrypt.hash' method is used to hash arguments passed to it. In this case the users password and the bcrypt salt are both passed to 'bcrypt.hash' with the resulting hash being assigned as the 
    // value of the variable 'hashedPassword'. 
    const hashedPassword = await bcrypt.hash(password, bcryptSalt)
    // Here the 'this.create' method is passed the variables 'userName', 'email', and 'hashedPassword' to create a new user object which is assigned as the value of the variable 'user'.
    const user = await this.create({userName, email, password: hashedPassword})
    // This returns the 'user' object.
    return user
}

// This is the 'static' user login method 
userSchema.statics.login = async function (email, password) {
    // Form validation
    // Empty fields check
    // This 'IF' statement checks if the 'email' or 'password' fields are empty, if they are execute the code within the statement.
    if (!email || !password) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Please fill in all fields'.
        throw Error('Please fill in all fields')
    }

    // Does user exist check.
    // Here the 'this' keyword is used in place of 'User' to refer to the User model as the User model is not accessable from inside the static method.
    const user = await this.findOne({email})

    // This 'IF' statement checks to see if the variable 'user' does NOT exist if it does NOT exist execute the code within the 'IF' statement.
    if (!user) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Incorrect email or password'.
        throw Error('Invalid email or password')
    }

    // Here the 'bcrypt.compare' method is used to compare the entered 'password' with the hashed password 'user.password' stored in the 'user' object.
    // If the passwords match the boolean value of true is assigned as the value of the variable 'passwordMatch'.  
    const passwordMatch = await bcrypt.compare(password, user.password)

    // If the passwords don't match, this block 'throws' an error with the message 'Invalid email or password'
    // This 'IF' statement checks to see if the passwords DON'T match. If the passwords DON'T match execute the code within the 'IF' statement.
    if (!passwordMatch) {
        // This 'throws' an error which can be caught in a catch statement and halts execution of the code and produces a new error object with the message 'Incorrect email or password'.
        throw Error('Invalid email or password')
    }
    // This returns the 'user' object.
    return user
}
// This uses 'mongoose.model' which has been passed the schema through the variable 'userSchema' and the string 'User' to create a new model using the schema to create a collection called User.
module.exports = mongoose.model('User', userSchema)
// exerciseEntryForm.js

// This imports the 'useState' hook from the React library.
import { useState } from "react"

// This is the functional component 'ExerciseEntryForm'.
const ExerciseEntryForm = () => {
    // This initializes the variable 'exerciseName' and the function 'setExerciseName' which are set to equal the React hook 'useState' which has an initial value of an empty string ('').
    // When the 'setExerciseName' function is called and passed a value or object containing values, that value or values will be assigned as the new value of the variable 'exerciseName'.
    const [exerciseName, setExerciseName] = useState('')

    // This initializes the variable 'weight' and the function 'setWeight' which are set to equal the React hook 'useState' which has an initial value of an empty string (''). 
    // When the 'setWeight' function is called and passed a value or object containing values, that value or values will be assigned as the new value of the variable 'weight'.
    const [weight, setWeight] = useState('')

    // This initializes the variable 'reps' and the function 'setReps' which are set to equal the React hook 'useState' which has an initial value of an empty string (''). 
    // When the 'setReps' function is called and passed a value or object containing values, that value or values will be assigned as the new value of the variable 'reps'.
    const [reps, setReps] = useState('')

    // This initializes the variable 'error' and the function 'setError' which are set to equal the React hook 'useState' which has an initial value of 'null'. 
    // When the 'setError' function is called and passed a value or object containing values, that value or values will be assigned as the new value of the variable 'error'.
    const [error, setError] = useState(null)

    // Here the asynchronous function 'submissionHandler' is defined and passed the vent object (e) to handle user data imput submissions via a button click.
    const submissionHandler = async (e) => {
        // This prevents the default form submission behaviour of refreshing the page.
        e.preventDefault()

        // Here an exercise object is created with the initial values from the state.
        const exercise = {exerciseName, weight, reps}

        // Here data is 'fetched' from 'http://localhost:9000/api/exercises' using 'await' which pauses the execution of the function until it's completed, then assigns the result as the value of the variable 'response'.
        const response = await fetch('http://localhost:9000/api/exercises', { 
            // This declares the HTTP method used for the request.
            method: 'POST',
            // Here 'JSON.stringify' is passed the variable 'exercise' containing the JavaScript exercise object to convert the object into JSON string and the set it as the request body.
            body: JSON.stringify(exercise),
            headers: {
                // This specifies that the request body is in JSON format.
                'Content-Type': 'application/json'
            }
        })
        // This parses the response from JSON string into a JavaScript object using 'await' which pauses the execution of the function until it's completed, then assigns the JavaScript object to the variable 'json'.
        const json = await response.json()

        // This 'IF' statement uses the '!'operator and 'response.ok' property boolean value to check if the response is NOT okay. 
        // If the HTTP status code value is not in the range of 200-299 the response will NOT be ok and the code block will execute.
        if (!response.ok) {
            // Here the 'setError' function is called and passed the variable 'json' specifying the error property '.error' which contains the data of the error parsed from the response updating the state of the 
            // 'error' variable to the retrieved error data.
            setError(json.error)
        }
        // This 'IF' statement is used with the 'response.ok' property boolean value. If the HTTP status code value is 200-299 the response will be ok and the code block will execute.
        if (response.ok) {
            // This clears all the input fields and resets error state.
            setExerciseName('')
            setWeight('')
            setReps('')
            setError(null)
            // This logs the success message 'New exercise entered into database' and the returned data from the API into the console.
            console.log('New exercise entered into database', json)
        }
    }

    return (
        <form className = "newEntry" onSubmit={submissionHandler}>
            <h3>Add Exercise</h3>
            {/* Input field for Exercise Name */}
            <label>Exercise Name:</label>
            {/* Here the 'onChange' event handler is passed the event object 'e', then the 'setExerciseName' function is called which is passed 'e.target.value' which contains the value of the event object
            which is the users input data which updates the state of the variable 'exerciseName' */}
            <input type="text" onChange={(e) => setExerciseName(e.target.value)}
            // Here the value of the input field is set to the current value of the 'exerciseName' state. 
            // In React this is known as a "controlled component" where the input value is controlled by React's state and any changes to the input field are reflected by updating the state, and vice versa.
            value = {exerciseName}
            />
            {/* Input field for Weight */}
            <label>Weight:</label>
            {/* Here the 'onChange' event handler is passed the event object 'e', then the 'setWeight' function is called which is passed 'e.target.value' which contains the value of the event object
            which is the users input data which updates the state of the variable 'weight' */}
            <input type="number" onChange={(e) => setWeight(e.target.value)}
            // Here the value of the input field is set to the current value of the 'weight' state. 
            // In React this is known as a "controlled component" where the input value is controlled by React's state and any changes to the input field are reflected by updating the state, and vice versa.
            value = {weight}
            />
            {/* Input field for Reps */}
            <label>Reps:</label>
            {/* Here the 'onChange' event handler is passed the event object 'e', then the 'setReps' function is called which is passed 'e.target.value' which contains the value of the event object
            which is the users input data which updates the state of the variable 'reps' */}
            <input type="number" onChange={(e) => setReps(e.target.value)}
            // Here the value of the input field is set to the current value of the 'reps' state. 
            // In React this is known as a "controlled component" where the input value is controlled by React's state and any changes to the input field are reflected by updating the state, and vice versa.
            value = {reps}
            />
            {/* Button to add exercise */}
            <button>Add Exercise</button>
            {/* This is a conditional check, it ensures the variable 'error' is has value and is valid before rendering the error message */}
            {error && <div className="errorMessage">{error}</div>}
        </form>
    )
}
// This exports the functional component 'ExerciseEntryForm' as the default export of this module.
export default ExerciseEntryForm


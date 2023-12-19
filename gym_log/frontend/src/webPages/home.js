// This imports the 'useEffect' and 'useState' hooks from the React library.
import {useEffect, useState} from 'react'
// This imports the 'io' from the socket.io-client.
import io from 'socket.io-client';
// This imports the variable 'ExerciseInfo' from the file 'exerciseInfo' within the 'components' folder.
import ExerciseInfo from '../components/exerciseInfo'
// This imports the variable 'ExerciseInfo' from the file 'exerciseInfo' within the 'components' folder.
import ExerciseEntryForm from '../components/exerciseEntryForm'

// This is the functional component 'Home'.
const Home = () => {
    // This initializes the variable 'exercises' and the function 'setExercises' which are set to equal the React hook 'useState' which has an initial value of 'null'. 
    // When the 'setExercises' function is called and passed a value or object containing values, that value or values will be assigned as the new value of the variable 'exercises'.
    // This makes the variable 'exercises' reactive which triggeres React to re-render the component.
    const [exercises, setExercises] = useState([]) 
    // Here the 'useEffect' hook is used to perform side effects such as fetching data within a functional component.
    useEffect (() => {
        // Here the asynchronous function 'retrieveExercises' is defined to retrieve exercises from the API endpoint 'http://localhost:9000/api/exercises'.
        const retrieveExercises = async () => {
            // Here data is 'fetched' from 'http://localhost:9000/api/exercises' using 'await' which pauses the execution of the function until it's completed, then assigns the result as the value of the variable 'response'.
            const response = await fetch('http://localhost:9000/api/exercises')
            // This parses the response from JSON string into a JavaScript object using 'await' which pauses the execution of the function until it's completed, then assigns the JavaScript object to the variable 'json'.
            const json = await response.json()
            // Here an 'IF' statement is used with the 'response.ok' property boolean value. If the HTTP status code value is 200-299 the response will be ok and the code block will execute.
            if (response.ok) {
                // Here the 'setExercises' function is called and passed the variable 'json' which contains the data parsed from the response updating the state of the exercises variable to the retrieved exercise data.
                setExercises(json)                
            }
        }
        // This calls the 'retrieveExercises' function.
        retrieveExercises()
    },
    // This is the empty dependency array which ensures this 'useEffect' runs only once on initial render.
    [])

    // Here the 'useEffect' hook is used to perform side effects such as fetching data within a functional component.
    useEffect(() => {
        // This establishes a WebSocket connection to 'http://localhost:9000'
        const socket = io('http://localhost:9000', {
            extraHeaders: {
                "Access-Control-Allow-Origin": "*"
            }            
        });        
        // This is the Websocket event listener listening for the 'exerciseCreated' event to be emitted from the server. When the server emits the event execute the code within the block.
        socket.on('exerciseCreated', (exercise) => {
            // This uses the 'setExercises' method to update the exercises array state by adding the new exercise to the array state.
            setExercises(prevExercises => [exercise, ...prevExercises]);
        });
        // This is the Websocket event listener listening for the 'exerciseUpdated' event to be emitted from the server. When the server emits the event execute the code within the block.
        socket.on('exerciseUpdated', (updatedExercise) => {
            // This uses the 'setExercises' method to update the exercises array state by updating the exercise with the matching ID from exercises array state.
            setExercises(prevExercises =>
            prevExercises.map(exercise =>
                exercise._id === updatedExercise._id ? updatedExercise : exercise                
                )
            );
        });
        // This the Websocket event listener listening for the 'exerciseDeleted' event to be emitted from the server. When the server emits the event execute the code within the block.
        socket.on('exerciseDeleted', (exerciseId) => {
            // This uses the 'setExercises' method to update the exercises array state by deleting the exercise with the matching ID from exercises array state.
            setExercises(prevExercises =>
                prevExercises.filter(exercise => exercise._id !== exerciseId)
            );
        });
        return () => {
            // This disconnect the WebSocket when component unmounts
            socket.disconnect(); 
        };        
    },
    // This is the dependency array for this 'useEffect'. 
    [setExercises, exercises]);

    return (
        <div className = "home">
            <div className = "exercises">
                {/* This is a conditional check, it ensures the variable 'exercises' has value and is valid before rendering */}
                {exercises && exercises.map((exercise) => (
                    // This renders the ExerciseInfo components for each exercise in the 'exercises' array.
                    <ExerciseInfo key = {exercise._id} exercise = {exercise}/>
                ))}
            </div>
            {/* This renders the 'ExerciseEntryForm' component */}
            <ExerciseEntryForm />
        </div>
    )    
}
// This exports the functional component 'Home' as the default export of this module.
export default Home
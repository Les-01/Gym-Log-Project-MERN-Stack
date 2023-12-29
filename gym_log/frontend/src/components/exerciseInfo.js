// This imports the 'useState' hook from the React library.
import React, { useState } from 'react';

// This is the functional component 'ExerciseInfo' which has been passed the object 'exercise'.
const ExerciseInfo = ({exercise}) => {
    // This initializes the variable 'showModal' and the function 'setShowModal' which are set to equal the React hook 'useState' which has an initial value of 'false'.
    // When the 'setShowModal' function is called and passed a value of either 'true' or 'false' that value will be assigned as the new value of the variable 'showModal'.
    const [showModal, setShowModal] = useState(false);
    // This initializes the variable 'editedExerciseName' and the function 'setEditedExerciseName' which are set to equal the React hook 'useState' which has an initial value of the 'exerciseName' property 
    // stored in the 'exercise' object. When the 'setEditedExerciseName' function is called and passed a value, that value will be assigned as the new value of the variable 'editedExerciseName'.
    const [editedExerciseName, setEditedExerciseName] = useState(exercise.exerciseName);
    // This initializes the variable 'editedWeight' and the function 'setEditedWeight' which are set to equal the React hook 'useState' which has an initial value of the 'weight' property 
    // stored in the 'exercise' object. When the 'setEditedWeight' function is called and passed a value, that value will be assigned as the new value of the variable 'editedWeight'.
    const [editedWeight, setEditedWeight] = useState(exercise.weight);
    // This initializes the variable 'editedReps' and the function 'setEditedReps' which are set to equal the React hook 'useState' which has an initial value of the 'reps' property 
    // stored in the 'exercise' object. When the 'setEditedReps' function is called and passed a value, that value will be assigned as the new value of the variable 'editedReps'.
    const [editedReps, setEditedReps] = useState(exercise.reps);

    // This is the 'deleteButton' function.
    const deleteButton = async () => {
        // Here data is 'fetched' from 'http://localhost:9000/api/exercises/' + the unique id of the specific exercise entry, using 'await' which pauses the execution of the function until it's completed.
        await fetch('http://localhost:9000/api/exercises/' + exercise._id, {
            // This declares the HTTP method used for the request, here 'DELETE' is used to delete the database entry that matches the unique id of the specific exercise entry.
            method: 'DELETE'
        })
    }
    // This is the 'editButton' function.
    const editButton = () => {
        // Here the 'setShowModal' method is passed the boolean value of 'true'. When this is called the modal will be visible.
        setShowModal(true); 
    };
    // This is the 'closeModal' function.
    const closeModal = () => {
        // Here the 'setShowModal' method is passed the boolean value of 'false'. When this is called the modal will be hidden.
        setShowModal(false);
    };
    // This is the 'handleSaveChanges' function.
    const handleSaveChanges = async () => {
        try {
            // This creates an object containing all the updated exercise information.
            const updatedExercise = {
                // Updated exercise name
                exerciseName: editedExerciseName,
                // Updated exercise weight
                weight: editedWeight,
                // Updated exercise reps
                reps: editedReps,
            };    
            // Here data is 'fetched' from 'http://localhost:9000/api/exercises/' + the unique id of the specific exercise entry, using 'await' which pauses the execution of the function until it's completed.
            const response = await fetch('http://localhost:9000/api/exercises/' + exercise._id, {
                // This declares the HTTP method used for the request, here 'PATCH' is used to update the database entry that matches the unique id of the specific exercise entry.
                method: 'PATCH', // Use the PUT method for updating
                // This sets the content type to JSON.
                headers: {
                    'Content-Type': 'application/json',
                },
                // Here 'JSON.stringify' is passed the variable 'updatedExercise' containing the JavaScript updatedExercise object to convert the object into JSON string and the set it as the request body.
                body: JSON.stringify(updatedExercise),
            });    
            // This 'IF' statement declares that fi the response from the server is successful (status code 200-299) execute the code within the code block.
            if (response.ok) {
                // This parses the 'response' from a JSON string into a JavaScript object using 'await' which pauses the execution of the function until it's completed, then assigns the JavaScript object to the variable 'updatedExerciseFromServer'.
                const updatedExerciseFromServer = await response.json();
                // Here 'setEditedExerciseName' function is called and passed the 'exerciseName' property stored in the 'updatedExerciseFromServer' object updating the previous exercise 'name' with the edited version.
                setEditedExerciseName(updatedExerciseFromServer.exerciseName);
                // Here 'setEditedWeight' function is called and passed the 'weight' property stored in the 'updatedExerciseFromServer' object updating the previous exercise 'weight' with the edited version.
                setEditedWeight(updatedExerciseFromServer.weight);
                // Here 'setEditedReps' function is called and passed the 'reps' property stored in the 'updatedExerciseFromServer' object updating the previous exercise name with the edited version.
                setEditedReps(updatedExerciseFromServer.reps);    
                // This calls the 'closeModal' funtion closing the modal after a successful update.
                closeModal();
            }
            // This 'ELSE' statement is for handling update failure events.  
            else {                
                // Here 'console.error' is used to display the error message 'Failed to update exercise'.
                console.error('Failed to update exercise');
            }
        }
        // This 'CATCH' statement is for handling update error events.   
        catch (error) {
            // Here 'console.error' is used to display the error message 'Error updating exercise:' and the error object itself.
            console.error('Error updating exercise:', error);
        }
    };      

    // When 'ExerciseInfo' is called it returns the code within the parenthesis.
     return (        
        <div className="exercise_info">
            {/* This outputs the 'exerciseName' property of the 'exercise' object as a 'H4' heading*/} 
            <h4>{exercise.exerciseName}</h4>
            {/* This outputs the 'weight' property of the 'exercise' object */} 
            <p><strong>Weight (kg): </strong>{exercise.weight}</p>
            {/* This outputs the 'reps' property of the 'exercise' object */} 
            <p><strong>Reps: </strong>{exercise.reps}</p>
            {/* This outputs the 'createdAt' property of the 'exercise' object */} 
            <p>{formatDate(exercise.createdAt)}</p>
            {/* This creates a edit button with an 'onClick' event handler with calls the 'editButton' function */} 
            <span className="editButton" onClick={editButton}>Edit</span>
            {/* This creates a delete button with an 'onClick' event handler with calls the 'deleteButton' function */} 
            <span className="deleteButton" onClick = {deleteButton}>Delete</span>
            {/* This is a conditional statement wherein the modal will only render if 'showModal' is 'true' */} 
            {showModal && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>Edit Exercise</h2>
                        <form>
                            <label>Exercise Name:</label>
                            <input
                                // This sets the expected input as text.
                                type="text"
                                // Here value of the 'Exercise Name' form field is set to be populated with the value of the variable 'editedExerciseName'.
                                value={editedExerciseName}
                                // Here the 'onChange' event handler is passed the event object 'e', then the 'setEditedExerciseName' function is called which is passed 'e.target.value' which contains the value 
                                // of the event object which is the users updated data which updates the state of the variable 'editedExerciseName'.
                                onChange={(e) => setEditedExerciseName(e.target.value)}
                            />
                            <label>Weight (kg):</label>
                            <input
                                // This sets the expected input as number adding clickable arrows to the form for ease of use in increasing the value.
                                type="Number"
                                // Here value of the 'Weight' form field is set to be populated with the value of the variable 'editedWeight'.
                                value={editedWeight}
                                // Here the 'onChange' event handler is passed the event object 'e', then the 'setEditedWeight' function is called which is passed 'e.target.value' which contains the value 
                                // of the event object which is the users updated data which updates the state of the variable 'editedWeight'.
                                onChange={(e) => setEditedWeight(e.target.value)}
                            />
                            <label>Reps:</label>
                            <input
                                // This sets the expected input as number adding clickable arrows to the form for ease of use in increasing the value.
                                type="Number"
                                // Here value of the 'Reps' form field is set to be populated with the value of the variable 'editedReps'.
                                value={editedReps}
                                // Here the 'onChange' event handler is passed the event object 'e', then the 'setEditedReps' function is called which is passed 'e.target.value' which contains the value 
                                // of the event object which is the users updated data which updates the state of the variable 'editedReps'.
                                onChange={(e) => setEditedReps(e.target.value)}
                            />
                            {/* This is the modal cancel button which calls the 'closeModal' function which cancels the update and closes the modal */}
                            <button className="modalCancelButton" type="button" onClick={closeModal}>Cancel</button>
                            {/* This is the modal save button which calls the 'handleSaveChanges' function which executes the update process and closes the modal */}   
                            <button className="modalSaveButton" type="button" onClick={handleSaveChanges}>Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
// This exports the functional component 'ExerciseInfo' as the default export of this module.
export default ExerciseInfo

// This is the 'formatDate' function which has been passed the parameter 'dateString' to convert a date string to a specific format.
export const formatDate = (dateString) => {
    // Here a new 'Date' object from the provided date string is created and assigned as the value of the variable 'createdAt'.
    const createdAt = new Date(dateString);
    // This extracts the day, month, and year from the 'Date' object stored in the variable 'createdAt' returning a formatted date string.
    return `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
};  
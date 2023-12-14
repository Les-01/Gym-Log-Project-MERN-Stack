// exerciseInfo.js

// This is the functional component 'ExerciseInfo' which has been passed the object 'exercise'.
const ExerciseInfo = ({exercise}) => {
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
            <p>{exercise.createdAt}</p>
        </div>
    )
}
// This exports the functional component 'ExerciseInfo' as the default export of this module.
export default ExerciseInfo


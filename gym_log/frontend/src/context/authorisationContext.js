// authorisationContext.js

// This imports the 'createContext' and 'useReducer' from the React library.
import { createContext, useReducer } from 'react'
// Here React's 'createContext()' function is used to create an 'AuthorisationContext'.
export const AuthorisationContext = createContext()

// Here the 'AuthorisationReducer' functions are defined to handle state changes.
export const AuthorisationReducer = (state, action) => {
    //This is a switch case statement to switch based on the type of action received. 
    switch (action.type) {
        // If action type is 'LOGIN', update the state with the user payload.
        case 'LOGIN':
            return { user: action.payload }
        // If action type is 'LOGOUT', set the user state to null.
        case 'LOGOUT':
            return { user: null }
        // If no action type matches, return the current state.
        default:
            return state
    }
}

// This creates a context provider component for the AuthorisationContext
export const AuthorisationContextProvider = ({ children }) => {
    // Here the 'state' and 'dispatch' function are initialised using the useReducer.
    const [state, dispatch] = useReducer(AuthorisationReducer, {
        user: null
    });
    // Here console.log is used to log the current state to the console for debugging and error checking.
    console.log('Authorisation Context state: ', state)

    // This returns the 'AuthorisationContext.Provider' component with the current 'state' and 'dispatch' function as the value.
    return (
        <AuthorisationContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthorisationContext.Provider>
    )
}



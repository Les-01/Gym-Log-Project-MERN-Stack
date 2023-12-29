// This imports the 'Link' component from the routing library 'React Router'.
import {Link} from 'react-router-dom'
// This imports the 'useLogout' function from the file 'useLogout' within the 'hooks' folder.
import { useLogout } from '../hooks/useLogout'

// This is the functional component 'NavBar'.
const NavBar = () => {
    // This destructures the 'logout' function from the 'useLogout' hook enabling it to be used.
    const {logout} = useLogout()
    // This is the 'logoutBtnHandler' function which executes when the logout button is click.
    const logoutBtnHandler = () => {
        // This is the 'logout' function.
        logout()

    }
    // When 'NavBar' is called it returns the code within the parenthesis.
    return (
        <header>
            <div className = "container">
                {/* This is a link component used to navigate to the root URL '/' */}
                <Link to = "/">
                    {/* This is a H1 heading displaying the text 'Gym Log' */}
                    <h1>Gym Log</h1>
                </Link>
                <nav>
                    <div>
                    {/* Logout button triggering the 'logoutBtnHandler' function */}
                        <button onClick = {logoutBtnHandler}>Logout</button>
                    </div>
                    <div>
                        {/* Nav Bar links to routes */}
                        <Link to = "/login">Login</Link>
                        <Link to = "/signup">Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
// This exports the functional component 'NavBar' as the default export of this module.
export default NavBar
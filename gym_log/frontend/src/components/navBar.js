// This imports the 'Link' component from the routing library 'React Router'.
import {Link} from 'react-router-dom'

// This is the functional component 'NavBar'.
const NavBar = () => {
    // When 'NavBar' is called it returns the code within the parenthesis.
    return (
        <header>
            <div className = "container">
                {/* This is a link component used to navigate to the root URL '/' */}
                <Link to = "/">
                    {/* This is a H1 heading displaying the text 'Gym Log' */}
                    <h1>Gym Log</h1>
                </Link>
            </div>
        </header>
    )
}
// This exports the functional component 'NavBar' as the default export of this module.
export default NavBar
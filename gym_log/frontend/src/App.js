// This imports the 'BrowserRouter', 'Routes' and 'Route' components from the routing library 'React Router'.
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// This imports the variable 'Home' from the file 'home' in the 'webPages' folder.
import Home from './webPages/home'
// This imports the variable 'NavBar' from the file 'navBar' in the 'components' folder.
import NavBar from './components/navBar'

// This is the functional component 'App'.
function App() {
  // When 'App' is called it returns the code within the parenthesis.
  return (
    <div className="App">
      {/* This is the 'BrowserRouter' component which enables client side routing.*/}
      <BrowserRouter>
        {/* This is the 'NavBar' component, it's called outside of the 'Routes' component enabling it to appear on every page.*/}
        <NavBar />
        <div className = "sitePages">
          {/* This is the 'Routes' component which contains all the routes.*/}
          <Routes>
            {/* This is a 'Route' component which defines a specific route.*/}
            <Route
              // The path="/" defines the root URL.
              path="/"
              // This is the element prop which renders the Home component for the root URL, loading the HomePage on arrival.
              element = {<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
// This exports the functional component 'App' as the default export of this module.
export default App;

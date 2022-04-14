import React, { useState, createContext } from 'react';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import './index.css'

//Using the Context API to access properties of the alert state object within the Alert component
export const AppContext = createContext();

function App() {

  //Moved this useState() hook, that handles alert state object, from the <Alert /> component so we can access the property values of the alert object in other components (Login and Signup)
  const [alert, setAlert] = useState({
    type: '',
    show: false,
    msg: ''
  }
  );
  //const id = new Date().getTime().toString();
  return (
    <AppContext.Provider value={{alert, setAlert}}>
      <Routes>
        <Route path='/signup' element={<Login alert={alert} setAlert={setAlert} />} /> 
        <Route path='/signup-page' element={<SignUp alert={alert} setAlert={setAlert}/>} /> 
        <Route path='/home' element={<Home />} /> 
      </Routes>
    </AppContext.Provider>
  );
}
//<Route element={<Alert alert={alert} />} />

export default App;

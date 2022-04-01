import React from 'react';
import Login from './Components/Login';
import {
  Routes,
  Route,
} from 'react-router-dom'
import SignUp from './Components/SignUp';
import './index.css'

function App() {
  //const id = new Date().getTime().toString();
  return (
      <Routes>
        <Route path='/signup' element={<Login />} /> 
        <Route path='/signup-page' element={<SignUp />} /> 
      </Routes>
  );
}



export default App;

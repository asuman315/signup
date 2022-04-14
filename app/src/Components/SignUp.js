import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HashLoader from 'react-spinners/HashLoader'

import Alert from './Alert';

const SignUp = ({alert, setAlert}) => {
  
  const navigate = useNavigate();

  const {show, msg, type} = alert
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    firstname,
    lastname,
    email,
    password
  }
 // https://asuman-auth-api.herokuapp.com/
  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
     if (password !== retypePassword) {
      // console.log('Passwords are not matching. Please try again');
       setAlert({
         type: 'failed',
         show: true,
         msg: 'Passwords are not matching. Please try again'
       }
       )
       return;
     }

     setIsLoading(true);
     const response = await axios.post('https://asuman-auth-api.herokuapp.com/auth/signup', JSON.stringify(user),
     { 
        headers: { 'content-Type': 'application/json' },
        withCredentials: true 
     }
    );
    //console.log(response.data);
    const accessToken = response?.data?.token;
    //console.log(accessToken);
     setIsLoading(true);
     setFirstname('')
     setLastname('')
     setEmail('')
     setPassword('')
     setRetypePassword('')
     setSuccess(true);
   } catch (error) {
     console.log(error.response.data.msg);
     
     if (error) {
       setIsLoading(false);
       setAlert({
         type: 'failed',
         show: true,
         msg: error.response.data.msg
       }
       )
     } else {
       setAlert({
         type: 'failed',
         show: true,
         msg: 'Login Failed! Please, try again later'
       }
       )
     }
   }
  }

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  const toHomePage = () => {
    navigate('/home')
  }
  
  return (
    <>
      { isLoading &&
        <div className="loader">
          <HashLoader
            size={80}
            color={'#fhfhfh'}
          />
        </div> }
    { success ? toHomePage() :
    <section id='signup-container'>
      <div className="signup-container">
        <h1>create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="names">
            <input
              placeholder = 'Firstname'
              value={firstname}
              autoComplete='off'
              type = 'text'
              id = 'firstname'
              onChange={e => setFirstname(e.target.value)}
              required
            />

            <input
              placeholder = 'Lastname'
              value={lastname}
              autoComplete='off'
              type = 'text'
              id = 'lastname'
              onChange={e => setLastname(e.target.value)}
              required
            />  
          </div>

          <input
            placeholder='Email'
            value={email}
            autoComplete='off'
            type='text'
            id='email'
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              placeholder='Password'
              value={password}
              type={showPassword ? 'text' : 'password'}
              id='password'
              onChange={e => setPassword(e.target.value)}
              required
            />

           {showPassword ? <FaEye
              id='password-eye' 
              onClick={togglePassword}
            /> : <FaEyeSlash
              id='password-eye'
              onClick={togglePassword}
            /> }
          </div>
          
          <input
            placeholder='Confirm Password'
            value={retypePassword}
            autoComplete='off'
            type='password'
            id='retype-password'
            onChange={e => setRetypePassword(e.target.value)}
            required
          />

          {show && <Alert />}
          
          <button id='signup'>Sign Up</button>

     </form>
     <div className="login-info">
          Already have an account? <span><Link to={'/signup'}> Login</Link></span>
     </div>
      </div>
    </section>
    })</>
  )
}

export default SignUp
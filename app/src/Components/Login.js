import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from './Alert'
import HashLoader from 'react-spinners/HashLoader';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ alert, setAlert }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = {email, password}
  const { type, show, msg } = alert
  const navigate = useNavigate();

  const toSignupPage = () => {
    navigate('/signup-page')
  }

  const toHomePage = () => {
    navigate('/home')
  }

  const onSubmit = async (e) => {
   
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('https://asuman-auth-api.herokuapp.com/auth/login', JSON.stringify(user),
        {
          headers: { 'content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      const accessToken = response.data.token;
      //console.log(accessToken);
     
      setIsLoading(false);
      setPassword('');
      setEmail('');
      setSuccess(true);
    } catch (error) {
     // console.log(error.response.data.msg);
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

 return (
   <>
   { 
      isLoading && 
      <div className="loader">
        <HashLoader 
          size={80}
          color={'#fhfhfh'}
        /> 
      </div> 
   }
   { success ? toHomePage() : 
    <section id='login-container'>
      <div className="login-container">

        <h1 className="login-title">login</h1>

        <form onSubmit={onSubmit}>
          <input
          placeholder='Email'
          autoComplete='off'
          type='text'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          />
          <div className="password-container">
            <input
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />

            {showPassword ? <FaEye
              id='password-eye'
              onClick={togglePassword}
            /> : <FaEyeSlash
              id='password-eye'
              onClick={togglePassword}
            />}
          </div>

          {show && <Alert />}
          <input
            value='Login'
            type='submit'
            id='login'
          />
        </form>

        <div className="signup-info">
            Don't have an account? <span onClick={toSignupPage}>Sign up</span>
        </div>

      </div>
    </section>
   }</>
 )
}

export default Login
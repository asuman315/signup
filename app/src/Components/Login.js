import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const toSignupPage = () => {
    navigate('/signup-page')
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setPassword('')
      setEmail('')
    } catch (error) {
      console.log(error);
    }
  }

 return (
  <section id='login-container'>
    <div className="login-container">

      <h1 className="login-title">login</h1>

      <form onSubmit={onSubmit}>
        <input
         placeholder='Email'
         //autoComplete='off'
         type='text'
         id='email'
         value={email}
         onChange={e => setEmail(e.target.value)}
         required
        />

        <input
         placeholder='Password'
         type='password'
         id='password'
         value={password}
         onChange={e => setPassword(e.target.value)}
         required
        />

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
 )
}

export default Login
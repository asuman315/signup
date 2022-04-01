import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const toSignupPage = () => {
    navigate('/signup-page')
  }

 return (
  <section id='login-container'>
    <div className="login-container">

      <h1 className="login-title">login</h1>

      <form action="">
        <LoginInput
         placeholder='Email'
         type='text'
         id='email'
        />

        <LoginInput
         placeholder='Password'
         type='text'
         id='password'
        />

        <LoginInput
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

const LoginInput = ({ type, placeholder, value, id }) => {
 return (
    <input
     type={type}
     placeholder={placeholder}
     value={value}
     id={id}
    />
 )
}

export default Login
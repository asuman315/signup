import React from 'react'
import '../index.css'

const Login = () => {
 return (
  <section>
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
          Don't have an account? <span>Sign up</span>
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
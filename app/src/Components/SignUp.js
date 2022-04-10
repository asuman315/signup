import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  
  const [firstname, setFirstname] = useState('asuman')
  const [lastname, setLastname] = useState('ssendegeya')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')

  const user = {
    firstname,
    lastname,
    email,
    password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const response = await axios.post('http://localhost:5000/auth/signup', user);
    //console.log(response.data);
    const accessToken = response?.data?.token;
    //console.log(accessToken);
     setFirstname('')
     setLastname('')
     setEmail('')
     setPassword('')
     setRetypePassword('')
   } catch (error) {
      console.log(error.message);
   }
  }
  
  return (
    <section id='signup-container'>
      <div className="signup-container">
        <h1>create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="names">
            <input
              placeholder = 'Firstname'
              value={firstname}
              //autoComplete='off'
              type = 'text'
              id = 'firstname'
              onChange={e => setFirstname(e.target.value)}
              required
            />

            <input
              placeholder = 'Lastname'
              value={lastname}
              //autoComplete='off'
              type = 'text'
              id = 'lastname'
              onChange={e => setLastname(e.target.value)}
              required
            />  
          </div>

          <input
            placeholder='Email'
            value={email}
            //autoComplete='off'
            type='text'
            id='email'
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            placeholder='Password'
            value={password}
            type='password'
            id='password'
            onChange={e => setPassword(e.target.value)}
            required
          />
          
          <input
            placeholder='Re-type Password'
            value={retypePassword}
            //autoComplete='off'
            type='password'
            id='retype-password'
            onChange={e => setRetypePassword(e.target.value)}
            required
          />
          
          <button id='signup'>Sign Up</button>

     </form>
     <div className="login-info">
          Already have an account? <span><Link to={'/signup'}> Login</Link></span>
     </div>
      </div>
    </section>
  )
}

export default SignUp
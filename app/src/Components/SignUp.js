import React from 'react'


const SignUp = () => {
  return (
    <section id='signup-container'>
      <div className="signup-container">
        <h1>create account</h1>
        <form action="">
          <div className="names">
            <LoginInput
              placeholder = 'Firstname'
              type = 'text'
              id = 'firstname'
            />

            <LoginInput
              placeholder = 'Lastname'
              type = 'text'
              id = 'lastname'
            />  
          </div>

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
            placeholder='Re-type Password'
            type='text'
            id='retype-password'
          />

          <LoginInput
            value='Sign Up'
            type='submit'
            id='signup'
            className='signup'
          />

     </form>
      </div>
    </section>
  )
}

const LoginInput = ({ type, placeholder, value, id, className }) => {
 return (
  <input
   type={type}
   placeholder={placeholder}
   value={value}
   id={id}
   className={className}
  />
 )
}


export default SignUp
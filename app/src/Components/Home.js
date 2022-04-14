import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
 const navigate = useNavigate()
  return (
   <section className="home-page-container">
     <h1> Hello, You're Welcome! This Is Our Home Page</h1>

    <button onClick={() => navigate('/signup')}>Log Out</button>
   </section>
  )
}

export default Home
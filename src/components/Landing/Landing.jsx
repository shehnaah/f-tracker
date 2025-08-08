import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <section className='landing-page'>
<div className='hero-content'>
              <h1> Simplify Spending. Master Saving.</h1>
  <Link to={'/dashboard'}>
                <button className=" start-btn"
        >Get Started</button>
  
</Link>    

</div>      
    </section>
  )
}

export default Landing

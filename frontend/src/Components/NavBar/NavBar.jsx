import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <>
        <nav className='navbar navbar-dark navbar-expand-sm bg-dark'>
          <div className='container'>
            <Link to={'/'} className='navbar-brand'><i className='fa fa-mobile-text-warning'/>Contact <span className='text-warning'>Manager</span></Link>
          </div>
          <div className='linkedin-twitter-links d-flex justify-content-sm-center'  >
            <a href="https://www.linkedin.com/in/aditya-pund-80b347202"  style={{marginRight:5, textDecoration:'none'}}>
              LinkedIN 
            </a>{" "}
            |  {" "}
            <a target="_blank" href="https://twitter.com/adityapund_?t=daUw4OZTpjDYRjXc8GG5JQ&s=09" style={{marginLeft:5, textDecoration:'none'}}>
               Aditya Pund
            </a>
          </div>
        </nav>
        
        
    </>
  )
}

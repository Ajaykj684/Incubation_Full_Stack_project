import React from 'react'
import './Signup.css'
import logo from '../../component/logo2.png'

function Signup() {
  return (
    <div className="App">
         <img src={logo} className="logo" alt="Business view - Reports" />
        <form className="form" >
        <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input type="number" name="phone" placeholder="phone number" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="ajaykj@gmail.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
          <button className="primary">Submit</button>
        </form>
       <h4 className='text'>Already have an Account ?</h4>
    </div>
  )
}

export default Signup
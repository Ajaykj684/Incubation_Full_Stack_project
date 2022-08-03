import React,{useState, useContext}  from 'react'
import './Login.css'
import logo from '../../component/logo2.png'
import AuthContext from '../../context/Authcontext'

function Login() {

  let {login } = useContext(AuthContext)
  let {user } = useContext(AuthContext)


  console.log(user.email,"555666666555")

  return (
    <div className="Applogin">
         <img src={logo} className="logo" alt="Business view - Reports" />

        <form className="form" onSubmit={login} >
         
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input  name="email" placeholder="ajaykj@gmail.com" />
          </div>
         
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="ajaykj@gmail.com" />
          </div>
         
          <button type="submit" className="primary">Submit</button>

        </form>

       <h4 className='text'>Don't have an Account ?</h4>
    </div>
  )
}

export default Login
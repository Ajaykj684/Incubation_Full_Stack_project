import React,{useState, useContext}  from 'react'
import './Login.css'
import logo from '../../component/logo2.png'
import AuthContext from '../../context/Authcontext'
import {useNavigate} from 'react-router-dom'

function Login() {

  let {login } = useContext(AuthContext)
  let {user } = useContext(AuthContext)
  let {msg} = useContext(AuthContext)

  console.log({msg},"ooo")
  
  const Navigate = useNavigate()

  return (
   

<div className="sectionn" > 


<div className="section-center">
<div className="container1">
    <div className="row">
        <div className="booking-form">
            <div className="form-header">
                <h1>Sign In</h1>
                {msg && <h6 className='msg'>{msg}</h6>}
            </div>
            <form   onSubmit={login}>
              
                    <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="form-control" type="email" placeholder="Enter your email.." required name="email"  />
                                        <span className="form-label">Email</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="password" name="password"  />
                                            <span className="form-label">password</span>
                                        </div>
                                    </div>
                                   
                                    </div>
                                    <div className="form-btn">
                                        <button className="submit-btn">Submit</button>
                                    </div>  
                                    <h6 className='text' onClick={()=>{Navigate('/signup')}}>Don't have an Account ?    Sign Up</h6>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
           





  )
}

export default Login
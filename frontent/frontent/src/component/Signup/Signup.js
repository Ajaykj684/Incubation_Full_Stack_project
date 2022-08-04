import React,{useState, useContext} from 'react'
import './Signup.css'
import logo from '../../component/logo2.png'
import AuthContext from '../../context/Authcontext'
import {useNavigate} from 'react-router-dom'

function Signup() {
  let {userSignup } = useContext(AuthContext)
  const Navigate = useNavigate()

  return (
   

<div className="section" > 


<div className="section-center">
<div className="container">
    <div className="row">
        <div className="booking-form">
            <div className="form-header">
                <h1>Sign Up</h1>
            </div>
            <form   onSubmit={userSignup}>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Name..." name="name" />
                        <span className="form-label">Name</span>
                    </div>
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
                                        <input className="form-control" type="text" placeholder="password" name="password"  />
                                            <span className="form-label">password</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input className="form-control" type="tel" placeholder="Enter you Phone"  name="phone" />
                                                <span className="form-label">Phone</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        <button className="submit-btn">Submit</button>
                                    </div>  
                                    <h6 className='text' onClick={()=>{Navigate('/login')}}>Already have an Account ?    Sign In</h6>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
           






  )
}

export default Signup
import React, {useState, useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import './User.css'
import axios from 'axios';
import AuthContext from '../../context/Authcontext'


function User() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const history = useNavigate();
    let {user} = useContext(AuthContext)
    let {logout} = useContext(AuthContext)


    console.log(user,"pp")
    const Application = async (e) => {
        e.preventDefault();

        let response = await axios.post("http://127.0.0.1:8000/application/", {
            address: address,
            email: email,
            name: name,
            phone: phone,
            user: user.email
        })
        if (response.status === 200) {
            alert("succesfully applied")
        }

    }

    return (



<div className="section" > 

    <button className="logoutbtn" onClick={()=>{logout()}}>Logout</button>

  <div className="section-center">
    <div className="container">
        <div className="row">
            <div className="booking-form">
                <div className="form-header">
                    <h1>Make your reservation</h1>
                </div>
                <form  onSubmit={Application}>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Name..." name="name" onChange={(e) => setName(e.target.value) } />
                            <span className="form-label">Name</span>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group"> 
                                    <input className="form-control" type="date" required  />
                                        <span className="form-label">Check In</span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input className="form-control" type="email" placeholder="Enter your email.." required name="email" onChange={(e) => setEmail(e.target.value) } />
                                            <span className="form-label">Email</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select className="form-control" required>
                                                <option value="" selected hidden>no of rooms</option>
                                                <option>1</option>
                                               
                                            </select>
                                            <span class="select-arrow"></span>
                                            <span class="form-label">Rooms</span>
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select className="form-control" required>
                                                <option value="" selected hidden>no of Employees</option>
                                                
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select className="form-control" required>
                                                <option value="" selected hidden>Clients</option>
                                                
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Enter your Address" name="address"  onChange={(e) => setAddress(e.target.value) }/>
                                                <span className="form-label">Address</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input className="form-control" type="tel" placeholder="Enter you Phone"  name="phone" onChange={(e) => setPhone(e.target.value) }/>
                                                    <span className="form-label">Phone</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-btn">
                                            <button className="submit-btn">Book Now</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
               
              


    )
}

export default User 

import React,{useState,useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import './User.css'
import axios from 'axios';
import AuthContext from '../../context/Authcontext'



function User() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const history = useNavigate();
  let {user } = useContext(AuthContext)



 const Application= async (e) =>{
  e.preventDefault();
 
  let response = await axios.post("http://127.0.0.1:8000/application/",
        {
        address:address,
        email:email,
        name:name,
        phone:phone,
        user:user.email
        })
        if (response.status === 200){
          alert("succesfully applied")
        }

 }

  return (


    <div className="Appuser">
    
   <form className="form" onSubmit={Application} >
   <div className="input-group">
       <label htmlFor="username">name</label>
       <input type="text" name="name" onChange={(e)=>setName(e.target.value)} placeholder="username" />
     </div>
     <div className="input-group">
       <label htmlFor="phone">Phone</label>
       <input type="number" name="phone" onChange={(e)=>setPhone(e.target.value)} placeholder="phone number" />
     </div>
     <div className="input-group">
       <label htmlFor="email">Email</label>
       <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="ajaykj@gmail.com" />
     </div>
     <div className="input-group">
       <label htmlFor="address">Address</label>
       <input type="text" name="address" onChange={(e)=>setAddress(e.target.value)} placeholder="address" />
     </div>
     <button type='submit' className="primary">Submit</button>
   </form>
</div>
  )
}

export default User
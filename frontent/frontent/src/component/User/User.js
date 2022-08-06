import React, {useState, useContext} from 'react'
import {Navigate, renderMatches, useNavigate} from 'react-router-dom'
import './User.css'
import axios from 'axios';
import AuthContext from '../../context/Authcontext'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';




function User() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [slot, setSlot] = useState('');


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
            user: user.username
        })
        if (response.status === 200) {
           
            setSlot(1)
            setOpen(true);
            
        }

    }

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

  
    const handleClose = () => {
      setSlot(null)
      setOpen(false);
    };


// navbar

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      logout()
      setAnchorEl(null);
    };

    const handleMenuClosebtn = () => {
        setAnchorEl(null);
      };




    return (
        <>
         <Box sx={{ flexGrow: 1 }} >
     
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Aj Groups Co-working Space
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClosebtn}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={()=>{handleMenuClose()}}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>


<div className="section" > 

   

  <div className="section-center">
    <div className="container">
        <div className="row">
            <div className="booking-form">
                <div className="form-header">
                    <h1>Make your reservation</h1>
                </div>
                <form  onSubmit={Application}>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Name..." name="name" required onChange={(e) => setName(e.target.value) } />
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
                                                <option value=""  hidden>no of rooms</option>
                                                <option>1</option>
                                               
                                            </select>
                                            <span className="select-arrow"></span>
                                            <span className="form-label">Rooms</span>
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select className="form-control" required>
                                                <option value=""  hidden>no of Employees</option>
                                                
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
                                                <option value=""  hidden>Clients</option>
                                                
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
                 





{slot === 1 && 
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"MAKE YOUR RESERVATION"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Application Submitted Successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
           OK
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
    }
               
  </div>  
  </>    


    )
}

export default User 

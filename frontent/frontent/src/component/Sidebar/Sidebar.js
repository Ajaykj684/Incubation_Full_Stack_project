import * as React from 'react';

import axios from 'axios';
import './Sidebar.css'

import {useEffect,useState,useContext} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

import SlotBooking from '../SlotBooking/SlotBooking'
import AuthContext from '../../context/Authcontext'


import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';






const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);    
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let {logout} = useContext(AuthContext)

  const [ data, setData]=useState([]);
  const [ select, setSelect]=useState([]);
  const [ show, setShow ]=useState([]);
  const [slot, setSlot] = useState([])
  const [slt, setSlt] = useState([])

  const [detail, setDetail] = useState([])


  const navigate = useNavigate();

  useEffect(()=>{ axios.get("http://127.0.0.1:8000/application/").then((res)=>setData(res.data))
  setSlot(1)
  
  },[select])



  useEffect(()=>{
  const newdata = data.filter(val =>{ return val.Approved === false && val.Denied === false }); setShow(newdata)},[data])


  // Application View

  const [openn, setOpenn] =useState(false);

  const handleClickOpen = (id) => {
    axios.post(`http://127.0.0.1:8000/detailRequest/${id}`).then((res)=>{
    setDetail(res)
   
    setSlt(5)

    setOpenn(true);
  })};

  const handleClose = () => {
    setOpenn(false);
    setSlt(null)
  };






// routing

const selectItem=(text)=>{
 if(text==='APPLICATION LIST'){
     setSlot(1)
     const newdata = data.filter(val =>{
     
      return val.Approved === false && val.Denied === false
     })
     setShow(newdata)
  }
  
  else if(text==='APPROVED LIST'){
    setSlot(2)
    const newdata = data.filter(val =>{
     
      return val.Approved === true
     })
     setShow(newdata)
  

  }

  else if(text==='DECLINED LIST'){
    setSlot(2)
    const newdata = data.filter(val =>{
     
      return val.Denied === true
     })
     setShow(newdata)

  }
      
 }


const SlotBook=(text)=>{
  if(text==="BOOKING SLOT"){
    setSlot(3)
  }
  else if(text==="LOGOUT"){
    setSlot(6)
    setOpen(true);
    
  }
}

console.log(show)

//  Application Approve

 const [ appId , setAppId]=useState([])

 const ApproveDiologe=(id)=>{
  setAppId(id)
  setSlot(7)
  setOpen(true);
 }

 const ApproveConfirm=()=>{
  axios.post(`http://127.0.0.1:8000/approveRequest/${appId}`).then((res)=>{
    setSlot(1)
    setSelect(res)
    setAppId(null)
    setSlot(null)
    setOpen(false);


 })}

 const ApproveClose=()=>{
  setSlot(null);
  setOpen(false);
  setSlot(1)
  setAppId(null)

  }



 
// Application Decline


const DeclineDiologe=(id)=>{
  setAppId(id)
  setSlot(8)
  setOpen(true);
 }


 const DeclineConfirm=()=>{
  axios.post(`http://127.0.0.1:8000/declineRequest/${appId}`).then((res)=>{
    setSelect(res,1)
    setAppId(null)
    setSlot(null)
    setOpen(false);
  })

 }


 const DeclineClose=()=>{
  setSlot(null);
  setOpen(false);
  setSlot(1)
  setAppId(null)

  }





// admin Logout

const [opens, setOpens] = React.useState(false);

const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



const handleClosing = () => {
  setSlot(1)
  setOpens(false);
};

const logoutConfirm=()=>{
  setSlot(null)
  setOpens(false);
  logout()
}





  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" className="welcomeTitle">
            WELCOME ADMIN
          </Typography>
         
        </Toolbar>
       
      </AppBar>
     
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['APPLICATION LIST', 'APPROVED LIST', 'DECLINED LIST'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} onClick={() => {selectItem(text) }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['BOOKING SLOT', 'LOGOUT'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} onClick={()=>{SlotBook(text)}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
      
        <table className="table table-bordered">
            <thead> 
            { slot === 1 &&
                 <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
              
                <th scope="col" >View</th>
                <th scope="col">Approve</th>
                <th scope="col">Decline</th>
                

              </tr>}
              { slot === 2 &&
                 <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
              
                <th scope="col">View</th>
               
                

              </tr>}
            </thead>
            <tbody>
              
           {show.map((value)=>(
             slot === 1 &&
              <tr>
               
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
              
                <td ><button className="Viewbutton" onClick={()=>{handleClickOpen(value.id)}}>View</button></td>
                <td><button className="Greenbutton" onClick={()=>{ApproveDiologe(value.id)}}>Approve</button></td>
                <td><button className="Redbutton" onClick={()=>{DeclineDiologe(value.id)}}>Decline</button></td>

              </tr>
             ))} 



            {show.map((value)=>(
             slot === 2 &&
              <tr>
               
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
              
                <td ><button className="Viewbutton"  onClick={()=>{handleClickOpen(value.id)}}>View</button></td>

              </tr>
             ))} 
            </tbody>
          </table>



{ slt === 5 &&


    <div>
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Application Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          <List>
          <ListItem button>
            <ListItemText primary={detail.data.address} secondary="Address" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={detail.data.email} 
              secondary="email"/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={detail.data.name} secondary="Name" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={detail.data.phone} secondary="Phone" />
          </ListItem>
          <Divider />
        </List>
          </Typography>
        
         
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
           OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>


}


 { slot === 3 &&
     <SlotBooking/>
 }




{slot === 6 && 
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClosing}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
         
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to Logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClosing}>
          <h6>Cancel</h6> 
          </Button>
          <Button autoFocus onClick={logoutConfirm}>
          <h6 className='logout'>Logout</h6> 
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
    }






{slot === 7 && 
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={ApproveClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
         
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to <b>Approve</b> this Application ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={ApproveClose}>
          <h6>Cancel</h6> 
          </Button>
          <Button autoFocus onClick={ApproveConfirm}>
          <h6 className='Approve'>Approve</h6> 
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
    }





{slot === 8 && 
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={DeclineClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
         
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to <b>Decline</b> this Application ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={DeclineClose}>
          <h6>Cancel</h6> 
          </Button>
          <Button autoFocus onClick={DeclineConfirm}>
          <h6 className='Decline'>Decline</h6> 
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
    }




        </Typography>
       
      </Main>
    </Box>

    
   
  );
  
}

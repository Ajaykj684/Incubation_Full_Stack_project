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

  const navigate = useNavigate();

  useEffect(()=>{ axios.get("http://127.0.0.1:8000/application/").then((res)=>setData(res.data))
  
  },[select])



  useEffect(()=>{
  const newdata = data.filter(val =>{ return val.Approved === false && val.Denied == false }); setShow(newdata)},[data])





const selectItem=(text)=>{
 if(text==='APPLICATION LIST'){
     setSlot(1)
     const newdata = data.filter(val =>{
     
      return val.Approved === false && val.Denied == false
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

 const ApproveRequest=(id)=>{
  axios.post(`http://127.0.0.1:8000/approveRequest/${id}`).then((res)=>{
   
    setSelect(res)
  })

 }


 const DeclineRequest=(id)=>{
  axios.post(`http://127.0.0.1:8000/declineRequest/${id}`).then((res)=>{
    setSelect(res,1)
  })

 }


const SlotBook=(text)=>{
  if(text==="BOOKING SLOT"){
    setSlot(3)
  }
  else if(text==="LOGOUT"){
    setSlot(3)
    logout()
  }
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
          
          <Typography variant="h6" noWrap component="div">
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
          
       { 4 === 4 &&
        <table className="table table-bordered">
            <thead> 
            { slot === 1 &&
                 <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
              
                <th scope="col">View</th>
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
              
                <td ><button className="Viewbutton">View</button></td>
                <td><button className="Greenbutton" onClick={()=>{ApproveRequest(value.id)}}>Approve</button></td>
                <td><button className="Redbutton" onClick={()=>{DeclineRequest(value.id)}}>Decline</button></td>

              </tr>
             ))} 



            {show.map((value)=>(
             slot === 2 &&
              <tr>
               
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
              
                <td ><button className="Viewbutton">View</button></td>

              </tr>
             ))} 
            </tbody>
          </table>}
          { slot === 3 &&
              <SlotBooking/>
          }

        </Typography>
       
      </Main>
    </Box>
   
  );
  
}



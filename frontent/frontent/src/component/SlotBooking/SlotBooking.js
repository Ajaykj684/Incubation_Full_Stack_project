import React,{useState,useEffect} from 'react'
import './SlotBooking.css'
import axios from 'axios';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';





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






function SlotBooking() {

const [slot,setSlot] =useState([])

const [seat, setSeat] =useState([])
const [seatAvailable, setseatAvailable] =useState([])
const [seatReserved, setseatReserved] =useState([])

const [application, setApplication] =useState([])

const [number,setNumber] =useState([])
const [column,setColumn] =useState([])

const [open, setOpen] = React.useState(false);

const [slt,setSlt] =useState([])
const [divide,setDivide] =useState([])



const handleClickOpen = (row) => {
    axios.post(`http://127.0.0.1:8000/reservedDetail/${row}`).then((res)=>{setseatReserved(res.data)
  
    setOpen(true)
    setSlt(1)
})};

  const handleClose = () => {
    setseatReserved(null)
    setOpen(false);
    setSlt(null)
    
  };



useEffect(()=>{ axios.get("http://127.0.0.1:8000/application/").then((res)=>
setApplication(res.data.filter((data)=>{
  return data.alloted === false && data.Denied === false && data.Approved === true
})))


},[slot])


useEffect(()=>{ axios.get("http://127.0.0.1:8000/seat/").then((res)=>setSeat(res.data))
  
},[slot])

useEffect(()=>{ 
  const newdata = seat.filter(val=>{return val.available === true });
  const data = seat.filter(val=>{return val.reserved === true });

  setseatAvailable(newdata)
  setseatReserved(data)


},[slot])

const handleDrawerClose=()=>{
  setNumber(null)
  setColumn(null)
  
}

const divider=(i)=>{
  i.preventDefault()
  setDivide(1)
  return i+1;
}




const onClickData=(row)=> {
    if( row.available === true){
      setNumber(1)
      setColumn(row.id)
     }
  }

const handleSubmit=(id)=>{
  axios.post(`http://127.0.0.1:8000/seatalloting/${column}`,{number: id }).then((res)=>setSlot(res.data),
  setNumber(null)
     
  )

}




  return (
    <div className="container">
          <h2></h2>
          { number === 1 &&  <div>
            <IconButton onClick={handleDrawerClose}>
         <ChevronLeftIcon />
            </IconButton>
               { application.map((val)=>( <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography onClick={()=>{handleSubmit(val.id)}} >{val.email}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {val.address}
                      {val.phone}
                   
                    </Typography>
                  </AccordionDetails>
                </Accordion>
               ))}
            
            </div>
            }



          <table className="grid">
          <tbody>
               <tr>   
                  { seat.map((row, i)=>( 
                   
                   
                    <td   
                     className={row.available===true ?  'available': 'reserved'}

                      key={row}   onClick = {() =>onClickData(row)} > 
                      
                       {row.reserved === true && <a className='viewbtn' onClick = {() =>handleClickOpen(row.id)}>view</a> }
                      
                      
                    </td>
                    
                    
                    
               ))} </tr>
              
            </tbody>
          </table>


{divide === 1 &&

<div className='divider'></div>

}

{ slt == 1 &&
          <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Client Details   
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          <List>
          <ListItem button>
           <ListItemText primary={seatReserved.name} secondary="Name" />
            
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={seatReserved.alloted_slot} secondary="Room" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary={seatReserved.email} 
              secondary="email"/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={seatReserved.address} secondary="Address" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={seatReserved.phone} secondary="Phone" />
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



 
          
         
     </div>

  );
}

export default SlotBooking
import React,{useState,useEffect} from 'react'
import './SlotBooking.css'

function SlotBooking() {

const [slot,setSlot] =useState([])

const [seat, setSeat] =useState([])
const [seatAvailable, setseatAvailable] =useState([])
const [seatReserved, setseatReserved] =useState([])




console.log(seatReserved,"dddd")

useEffect(()=>{ setSlot({
    seat: [
      'Front1','Front2','Front3','Front4','Front5',
      'Middle1','Middle2','Middle3','Middle4',
      'Back1','Back2','Back3','Back4',
    ],
    seatAvailable: [
      'Front1','Front2','Front3','Front4','Front5',
      'Middle1','Middle2','Middle3','Middle4',
      'Back1','Back2','Back3','Back4',
    ],
    seatReserved: []
  })},[]);

const onClickData=(seat)=> {
  
    if(slot.seatReserved.indexOf(seat) > -1 ) {
       
     setSlot({
        seatAvailable: slot.seatAvailable.concat(seat),
        seatReserved: slot.seatReserved.filter(res => res != seat)
      })
    } else {
    setseatReserved({
      seatReserved:[seatReserved,seat]
        
      })
    // setseatAvailable({
    //   seatAvailable:seatAvailable.filter(res => res != seat)
    // })
    
    }
    console.log(seatReserved,"ttttttttt")
  }

  return (
    <div className="container">
          <h2></h2>
          <table className="grid">
          <tbody>
               <tr>   { slot.seat?.map((row)=>( 
                    
               
                  
                    <td 
                     className={row.indexOf(row) > -1? 'reserved': 'available'}
                      key={row}  onClick = {() =>onClickData(row)}> </td>
                     
               ))} </tr>
            </tbody>
          </table>
          
          {/* <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } /> */}
     </div>
     
  )
 

}

export default SlotBooking






// class App extends React.Component {
  
//     constructor() {
//       super();
//         this.state = {
//         seat: [
//           'Front1','Front2','Front3',
//           'Middle1','Middle2','Middle3',
//           'Back1','Back2','Back3'
//         ],
//         seatAvailable: [
//           'Front1','Front2','Front3',
//           'Middle1','Middle2','Middle3',
//           'Back1','Back2','Back3'
//         ],
//         seatReserved: []
//       }
//     }
    
//     onClickData(seat) {
//       if(this.state.seatReserved.indexOf(seat) > -1 ) {
//         this.setState({
//           seatAvailable: this.state.seatAvailable.concat(seat),
//           seatReserved: this.state.seatReserved.filter(res => res != seat)
//         })
//       } else {
//         this.setState({
//           seatReserved: this.state.seatReserved.concat(seat),
//           seatAvailable: this.state.seatAvailable.filter(res => res != seat)
//         })
//       }
//     }
    
//     render() {
//       return (
//         <div>
//           <h1>Seat Reservation System</h1>
//           <DrawGrid 
//             seat = { this.state.seat }
//             available = { this.state.seatAvailable }
//             reserved = { this.state.seatReserved }
//             onClickData = { this.onClickData.bind(this) }
//             />
//         </div>
//       )
//     }
//   }
  
//   class DrawGrid extends React.Component {
//     render() {
//       return (
//          <div className="container">
//           <h2></h2>
//           <table className="grid">
//             <tbody>
//                 <tr>
//                   { this.props.seat.map( row =>
//                     <td 
//                       className={this.props.reserved.indexOf(row) > -1? 'reserved': 'available'}
//                       key={row} onClick = {e => this.onClickSeat(row)}>{row} </td>) }
//                 </tr>
//             </tbody>
//           </table>
          
//           <AvailableList available = { this.props.available } />
//           <ReservedList reserved = { this.props.reserved } />
//          </div>
//       )
//     }
    
//     onClickSeat(seat) {
//       this.props.onClickData(seat);
//     }
//   }
  
//   class AvailableList extends React.Component {
//     render() {
//       const seatCount = this.props.available.length;
//       return(
//         <div className="left">
//           <h4>Available Seats: ({seatCount == 0? 'No seats available' : seatCount})</h4>
//           <ul>
//             {this.props.available.map( res => <li key={res} >{res}</li> )}
//           </ul>
//         </div>
//       )
//     }
//   }
  
//   class ReservedList extends React.Component {
//     render() {
//       return(
//         <div className="right">
//           <h4>Reserved Seats: ({this.props.reserved.length})</h4>
//           <ul>
//             { this.props.reserved.map(res => <li key={res} >{res}</li>) }
//           </ul>
//         </div>
//       )
//     }
//   }
  
  
//   ReactDOM.render(<App name="Rachelle" />, document.getElementById('app'));
import { createContext ,useState,useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children})=> {

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user,setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
   
    const Navigate = useNavigate()

    useEffect(()=>{ 
        console.log("here")
    },[user])



    let login = async (e)=>{

        e.preventDefault()

        let response = await  axios.post("http://127.0.0.1:8000/api/token/",
        {'username':e.target.email.value, 'password':e.target.password.value})
       

        if(response.status === 200){
            
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
        
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            console.log("logged in")

            loginAuth()

        }else{
          
            alert('something went wrong !')    
             
        }
        }


    const loginAuth=()=>{
        console.log({user},"qq")
        if(user.is_superuser===true){
            Navigate('/admin')
        }
        else{
            Navigate('/')
        }
    }
    

    
    let userSignup = async (e)=>{
        e.preventDefault();
        let response = await axios.post("http://127.0.0.1:8000/signup/",
        {'username':e.target.email.value, 'email':e.target.email.value, 'password':e.target.password.value , 'phone':e.target.phone.value})
        
        console.log(response)

        if (response.status === 200){
            
             Navigate('/login')
            }
        else{
            alert('something went wrong !') 
        }
    }


    let logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        Navigate('/login')
    }



    let contextData = {
        login:login,
        user:user,
        userSignup:userSignup,
        logout:logout,
        }


    return (
         <AuthContext.Provider value={contextData}>
                {children}
        </AuthContext.Provider>
        )

}
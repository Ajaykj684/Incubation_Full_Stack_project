import { createContext ,useState,useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children})=> {

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user,setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    
    let [msg,setMsg]= useState("")
    let [loading,setLoading] = useState(true)

    const Navigate = useNavigate()
    console.log(msg,"ggg")

    useEffect(()=>{ 
        setMsg(null)
    },[user])



    let login = async (e)=>{
        setMsg(null)
        e.preventDefault()

        let response = await  axios.post("http://127.0.0.1:8000/api/token/",
        {'username':e.target.email.value, 'password':e.target.password.value})
        console.log(response)

        if(response.status === 200){
            
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            console.log(setUser(jwtDecode(response.data.access)))
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            console.log("logged in")
            
            loginAuth()

        }else{
         
            setMsg("Something Went Wrong")    
             
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
    


    let updateToken = async ()=>{
        
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh': authTokens.refresh})
        })
        let data = await response.json()

        if (response.status === 200 ){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))

        }else{
            logout()
        }
        
    }



    
    let userSignup = async (e)=>{
        setMsg(null)
        e.preventDefault();
        let response = await axios.post("http://127.0.0.1:8000/signup/",
        {'username':e.target.email.value, 'email':e.target.email.value, 'password':e.target.password.value , 'phone':e.target.phone.value})
        
        console.log(response)

        if (response.status === 200){
            
             Navigate('/login')
             setMsg("Registered Successfully")
            }
        else{
           
            setMsg("Something Went Wrong")    
        }
    }


    let logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        Navigate('/login')
    }


    useEffect(()=>{

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },fourMinutes)
        return ()=> clearInterval(interval)

    },[authTokens,loading])



    let contextData = {
        login:login,
        user:user,
        userSignup:userSignup,
        logout:logout,
        msg:msg,
        }


    return (
         <AuthContext.Provider value={contextData}>
                {children}
        </AuthContext.Provider>
        )

}
import { createContext ,useState} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children})=> {

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user,setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const Navigate = useNavigate()



    let login = async (e)=>{

        e.preventDefault()

        let response = await  axios.post("http://127.0.0.1:8000/api/token/",
        {'username':e.target.email.value, 'password':e.target.password.value})
       
        console.log(response)

        if(response.status === 200){

            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            console.log()
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            console.log("logged in")
            console.log(authTokens)
            Navigate('/')

        }else{
          
            alert('something went wrong !')    
             
        }
        }




        let contextData = {
            login:login,
            user,user
        }


        return (
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        )

}
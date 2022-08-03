import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'

import User from './Pages/User';
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {AuthProvider} from './context/Authcontext'


function App() {
  return (
    < >
  <Router>
  <AuthProvider>
    <Routes>
          <Route exact path="/" element={<User/>} /> 
          <Route path="admin/" element={<Admin />} /> 
          <Route path="signup/" element={<Signup />} /> 
          <Route path="login/" element={<Login />} /> 

    </Routes>
    </AuthProvider>
  </Router>
    </>
  );
}

export default App;

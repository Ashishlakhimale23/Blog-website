import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import {useLocation} from "react-router-dom"
import Home from "../page/home" 
import CreatePost from "../page/createpost" 
import Signin from '../page/signin'
import Login from '../page/login'
import Header from './header'
import Usersinfo from '../page/usersinfo'
import { UserProfile } from '../page/userprofile'



function Layout() {
  const authtoken = localStorage.getItem("authtoken");
  const location = useLocation();
  const noheader = ["/signin","/login","/createpost"]

  return (
    <>
              {!noheader.includes(location.pathname) && <Header />}
              <Routes>
                <Route path='/' element={authtoken?<Home/>:<Signin/>}></Route>
                <Route path="/signin" element={<Signin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path='/username' element={<Usersinfo/>}/>  
                <Route path='/userprofile' element={<UserProfile/>}></Route>
              </Routes>
           
    </>
  );
}

export default Layout; 

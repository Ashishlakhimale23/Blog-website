import { useEffect,useContext } from "react";
import { useNavigate} from "react-router-dom"; 
import Header from "./header";
import { Authcontext } from "../context/context";
import axios from "axios";


function Home () {
 const {logged,setLogged} = useContext(Authcontext);

    useEffect(()=>{
      if(!logged){
        const token = localStorage.getItem("authtoken")
        if(!token){
          return
        }
        else{
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setLogged(true)
        }
      }

        
    },[setLogged]) 
    return(
        <>
        <Header />
</>)
}
export default Home

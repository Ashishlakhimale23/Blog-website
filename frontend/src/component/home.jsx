import { useEffect,useContext } from "react";
import { useNavigate} from "react-router-dom"; 
import Header from "./header";
import { Authcontext } from "../context/context";
import axios from "axios";


function Home () {
 const {logged,setLogged} = useContext(Authcontext);

    useEffect(()=>{
let authtoken = localStorage.getItem("authtoken");
    console.log(authtoken)
if (!authtoken ) {
    setLogged(false); 
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`;
  } 
        
    },[setLogged]) 
    return(
        <>
        <Header />
</>)
}
export default Home

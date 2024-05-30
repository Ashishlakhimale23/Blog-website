import { useEffect,useContext } from "react";
import Header from "../component/header";
import { Authcontext } from "../context/context";
import axios from "axios";
import Card from "../component/card";


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
    return (
      <>
        <Header />
        <div className="flex flex-row w-full px-80">
          <Card></Card>
          <div>hello</div>
        </div>
      </>
    );
}
export default Home

import { useEffect,useContext } from "react";
import Header from "../component/header";
import { Authcontext } from "../context/context";
import axios from "axios";
import Card from "../component/card";
import { Sidebarhome } from "../component/sidebarhome";


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
        <div className="flex justify-center h-screen p-8 xl:justify-normal xl:py-10 xl:px-28 gap-8">
          <Card></Card>
          <Sidebarhome></Sidebarhome> 
        </div>
      </>
    );
}
export default Home

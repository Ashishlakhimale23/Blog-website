import { useEffect,useContext, useState } from "react";
import Header from "../component/header";
import { Authcontext } from "../context/context";
import axios from "axios";
import Card from "../component/card";
import { Sidebarhome } from "../component/sidebarhome";


function Home () {
 const {logged,setLogged} = useContext(Authcontext);
 const [blogs,setBlogs] = useState(null);

    useEffect(()=>{
      async function fetchdata(){
       await axios.get("http://localhost:8000/user/getblogs")
          .then((resp)=>{console.log(resp);
            console.log(resp.data.blogs)
            setBlogs(resp.data.blogs);
           

          })
          .catch((error)=>{console.error(error)})
      } 
      if(!logged){
        const token = localStorage.getItem("authtoken")
        if(!token){
          return
        }
        else{
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setLogged(true)
          fetchdata();
          

        }
      }

        
    },[logged,setLogged]) 
    return (
      <>
        <Header />
        <div className="flex justify-center h-screen p-8  gap-8">
          <div className="space-y-8">
          {blogs == null ? <h1>hello</h1>: blogs.map((blog,i)=>(
            <Card key={i} title={blog.title} banner={blog.banner} editorjs_data={blog.content} author={blog.author} ></Card>
          ))}
</div>
          <Sidebarhome></Sidebarhome> 
        </div>
      </>
    );
}
export default Home

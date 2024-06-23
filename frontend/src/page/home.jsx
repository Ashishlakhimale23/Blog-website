import { useContext, useEffect,useState } from "react";
import axios from "axios";
import Card from "../component/card";
import { getdate } from "../utils/date";
import { UserContext } from "../context/context";



function Home () {
 const [blogs,setBlogs] = useState(null);
 const {initialinfo,setInitialinfo} = useContext(UserContext)
useEffect(()=>{
async function fetchdata(){
       await axios.get("/user/getblogs")
          .then((resp)=>{console.log(resp);
            setBlogs(resp.data.blogs);
          })
          .catch((error)=>{console.error(error)})
      }
      
      fetchdata();
},[])


    return (
      <>
       
        <div className="flex w-full h-full justify-center p-8 mt-16 mb-5 sm:p-12 md:p-16 " >
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {blogs == null ? (
              <h1></h1>
            ) : (
              blogs.map((blog, i) => (
                <Card
                  key={i}
                  title={blog.title}
                  banner={blog.banner}
                  editorjs_data={blog.content}
                  author={blog.author}
                  publishedOn={blog.publishedOn}
                  content={blog.content}
                  id={blog._id}
                  bookmarks={initialinfo.bookmarks}
                
                ></Card>
              ))
            )}
          </div>
        </div>
      </>
    );
}
export default Home

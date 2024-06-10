import { useState } from "react";
import {BlogContext} from "./context.js"
function BlogProvider({children}){
    
    const blogstructure = {
        content:[ ],
        title :"",
        banner:" "
        }
    const [blog,setBlog] = useState(()=>{
        const saved = localStorage.getItem("blog")
        return saved ? JSON.parse(saved) : blogstructure}) 
    const [texteditor,setTexteditor]=useState({isReady:false})
    return(
        <BlogContext.Provider value={{blog,setBlog,texteditor,setTexteditor}}>{children}</BlogContext.Provider>
    )
}
export default BlogProvider;
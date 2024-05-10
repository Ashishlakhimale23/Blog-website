import { useState } from "react";
import {UseContext} from "./context.js"
function BlogProvider({children}){
    const blogstructure = {
        content:[ ],
        title :"",
        
        }
    const [blog,setBlog] =useState(blogstructure) 
    const [texteditor,setTexteditor]=useState({isReady:false})
    return(
        <UseContext.Provider value={{blog,setBlog,texteditor,setTexteditor}}>{children}</UseContext.Provider>
    )
}
export default BlogProvider;
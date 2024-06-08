import { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs"
import tool from "../utils/tools"
import { Authcontext, UseContext } from "../context/context.js";
import { Toaster, toast } from "react-hot-toast"
import {useNavigate,useLocation} from "react-router-dom"
import axios from "axios";
import deafultbanner from "../img/blog banner.png"


function CreatePost() {

  const { blog, setBlog, texteditor, setTexteditor } = useContext(UseContext);
  const { title, content,banner } = blog;
  const {setAuthToken} = useContext(Authcontext)
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const BlogbannerRef = useRef();
  

  const handleBeforeUnload = async(e) =>{
    e.preventDefault()
      }
  useEffect(() => {
    setAuthToken(localStorage.getItem("authtoken")) 

    if(!texteditor.isReady){
     setTexteditor(new EditorJS({
      holder: "texteditor",
      data:"",
      tools: tool,
      placeholder: "Write some stories....",
    }));
    }

     window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      setTexteditor(!texteditor.isReady)
      window.removeEventListener('beforeunload', handleBeforeUnload);

    };
    

  }, [location.pathname,setTexteditor]);

  const handletitlechange = (e) => {
    setBlog({ ...blog, title: e.target.value })
  
    const textarea = e.target;
    textarea.style.height = "auto"
    const scrollheight = textarea.scrollHeight
    textarea.style.height = `${scrollheight}px`
  };

  const handlebannerinput = async (e) => {
    const filename = e.target.files[0];
    const formData = new FormData();
    formData.append("file", filename);
    formData.append("upload_preset", "coursefiles");
    formData.append("api_key", "993344952783557");
 
   const response = await fetch(
            "https://api.cloudinary.com/v1_1/ddweepkue/image/upload",
            {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setBlog((prevBlog) => ({ ...prevBlog, banner: data.secure_url }));
            BlogbannerRef.current.src = data.secure_url;
        } else {
            throw new Error("Failed to upload image");
        }
  };
  const handletitlekeydown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlepublish = async (e) => {
    let state = e.target.id;
    let str = state.toString();
    let result = str === "published";
    
    if (!banner.length){
      return toast.error("upload the blog banner...")
    }
    if (!title.length) {
      return toast.error("upload the blog title...")
    }

    if (texteditor.isReady) {
      try {
        setLoading(true);
        const savedData = await texteditor.save();
        console.log(savedData)
        if (savedData.blocks.length > 0) {
          setBlog((prevBlog) => ({ ...prevBlog, content: savedData.blocks }));
          console.log(content);
          await axios.post("http://localhost:8000/user/createblog", { title, content: savedData.blocks,result,banner})
            .then((response) =>{ toast.success("Blog created successfully!",{id:"success"})
           
              setTimeout(() => {
                toast.dismiss('success');
                setBlog({...blog,title:""})
               navigate("/home") 
              }, 500);
            })
            .catch(err => console.log(err));
                     
        } else {
          return toast.error("Please write some content.");
        }
      } catch (error) {
        console.error("Error saving or posting blog:", error);
        toast.error("An error occurred. Please try again.");
      } finally {
         
        setLoading(false);
       
       
      }
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <header className="w-full flex bg-white text-white items-center shadow-md h-16 justify-between">
          <div className="text-xl font-bold flex items-center lg:pl-32 space-x-6 grow pl-8  md:justify-start md:pl-10 md:grow-0">
            <div>
              <span className="text-black">Get</span>
              <span className="text-orange-600">better</span>
              <span className="text-gray-400">*</span>
            </div>
          </div>

          <div className="space-x-2 lg:space-x-10 lg:pr-28 flex md:pr-10 pr-2 md:space-x-10">
            <button
              id="published"
              className=" md:flex text-gray-600 p-2 font-medium items-center bg-gray-100  rounded-md hover:ring-gray-300 hover:ring-2"
              onClick={handlepublish}
              disabled={loading}
            >
              Publish
            </button>
            <button
              id="draft"
              className=" md:flex text-gray-600 p-2 font-medium items-center bg-gray-100  rounded-md hover:ring-gray-300 hover:ring-2"
              onClick={handlepublish}
              disabled={loading}
            >
              Save draft
            </button>
            <img
              src="https://i.pinimg.com/564x/0c/ec/fa/0cecfa5bd56a3a089467769c9ede571e.jpg"
              alt=""
              className="h-12 rounded-full lg:mr-7 "
            />
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:px-20  lg:py-10 mt-1 md:px-10 md:py-5 px-5"
        >
          <div className="lg:flex lg:justify-center mb-3">
            <div className="hover:opacity-80 aspect-video lg:h-[575px]  bg-white border-4 border-grey">
              <label htmlFor="uploadbanner">
                <img
                  src={deafultbanner}
                  ref={BlogbannerRef}
                  alt=""
                  className="z-20 w-full h-full"
                />
                <input
                  id="uploadbanner"
                  type="file"
                  accept=".png , .jpg , .jpeg"
                  hidden
                  className="h-full w-full"
                  onChange={handlebannerinput}
                />
              </label>
            </div>
          </div>
          <div className="lg:px-10">
            <textarea
              type="text"
              className="outline-none resize-none p-2 w-full overflow-hidden text-5xl font-extrabold mb-1"
              placeholder="Title"
              rows={1}
              value={title}
              onChange={handletitlechange}
              onKeyDown={handletitlekeydown}
            />
          </div>
          <hr className=" my-5" />
          <div id="texteditor" className="font-mono text-lg w-full p-4 "></div>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default CreatePost;

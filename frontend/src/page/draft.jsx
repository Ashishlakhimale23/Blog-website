import { useContext } from "react";
import { BlogContext, UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";

function Draft(){
    const {initialinfo} = useContext(UserContext)
    const {setBlog} = useContext(BlogContext)
    const {draft} =initialinfo
    const navigate = useNavigate()
    
    return (
        <>
      <div className="min-h-screen w-full mt-20 p-4 font-display ">
        <div className="mx-auto max-w-[900px] md:justify-center ">
        <p className="font-bold text-2xl mb-3 ">Drafts</p>
        <div className=" border-black border-4 p-4 rounded-md">
          {!draft.length? <p className="text-xl font-bold">You dont have any drafts</p>: draft.map((drafts, index) => (
            
            <div className="flex border-4 p-2 border-black mb-2 rounded-md" key={index}>
              <div className="flex-1 content-center">
                <p className="text-lg font-bold">{drafts.title}</p>
              </div>
              <div className="space-x-2">
              <button className="font-bold pt-2 pb-2 pr-4 pl-4 rounded-md hover:bg-black hover:text-white" onClick={()=>{
                const blog ={
                    title:drafts.title,
                    content:drafts.content,
                    banner:drafts.banner,
                    _id:drafts._id,
                    changed:true
                }
                console.log(blog)
                setBlog(blog)
                navigate("/createpost")
              }}>Edit</button>
              <button className="font-bold  pt-2 pb-2 pr-4 pl-4 rounded-md  hover:bg-black hover:text-white" onClick={async()=>{
                console.log(drafts._id)
               await axios.post("http://localhost:8000/user/deletedraft",{_id:drafts._id,title:drafts.title})
               .then((resp)=>{
                if(Object.values(resp.data).includes("deleted")){
                    toast.success("Draft deleted",{id:"success"})
                    setTimeout(() => {
                        toast.dismiss("success")
                       window.location.reload() 
                    }, 300);
                }
                if(Object.values(resp.data).includes("deleting failed")){
                    return toast.error("Draft deletion failed")
                }
               }).catch(err=>console.log(err))
              }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
</div>
      </div>
<Toaster/>
</>
    ); 
}
export default Draft;
import { useContext } from "react";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";

function Draft(){
    const {initialinfo} = useContext(UserContext)
    const {draft} =initialinfo
    const navigate = useNavigate()
    return (
      <div className="w-full min-h-screen mt-20 p-4">
        <div className=" border-black border-4 p-4 rounded-md">
          {draft.map((drafts, index) => (
            <div className="flex border-4 p-2 border-black mb-2 rounded-md">
              <div className="flex-1 content-center">
                <p className="text-lg font-bold">{drafts.title}</p>
              </div>
              <div className="space-x-2">
              <button className="font-bold pt-2 pb-2 pr-4 pl-4 rounded-md hover:bg-black hover:text-white" onClick={()=>{
                const blog ={
                    title:drafts.title,
                    content:drafts.content,
                    banner:drafts.banner
                }
                console.log(blog)
                localStorage.setItem("blog",JSON.stringify(blog))
                navigate("/createpost")
              }}>Edit</button>
              <button className="font-bold  pt-2 pb-2 pr-4 pl-4 rounded-md  hover:bg-black hover:text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ); 
}
export default Draft;
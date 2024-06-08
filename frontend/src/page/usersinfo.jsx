import { useRef, useState } from "react";
import deafultpfp from "../img/deafultpfp.jpg"
import techStack from "../utils/suggestion";
function Usersinfo(){
    const [predicated,setPredicated]= useState([])
    const [finaltechstack,setFinaltechstack] = useState([])
    const [techstack,setTechstack] = useState("")
    const stackRef = useRef();

    const getpredicatedvalue = (value)=>{
        const flitered = techStack.filter(item => item.toLowerCase().indexOf(value.toLowerCase())!==-1)
        setPredicated(flitered.slice(0,5))
    }
    
    const handletechstack = (e) =>{
        setTechstack(e.target.value)
        getpredicatedvalue(e.target.value)
        
    }
    
    const handleOnClickOnTechstack =(e)=>{
        if(finaltechstack.length<5){
          setFinaltechstack([...finaltechstack,e.target.innerText])
          setTechstack("")
        }
        if(finaltechstack.length==5){
            stackRef.current.placeholder = "Only five allowed"
        }
    } 
    return (
      <>
        <div className="w-full h-full space-y-5 ">
         
          <div className="w-3/4 h-full space-y-5 ">
            <p className="text-xl font-bold">Basic info</p>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold">User name</label>
                <p className="p-4 border hover:border-blue-500 rounded-lg ">
                  Ashishlakhimale
                </p>
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Email</label>
                <p className="p-4 border hover:border-blue-500 rounded-lg ">
                  ashishlakhimale23@gmail.com
                </p>
              </div>
              <div className="">
                <p className="font-semibold">
                  Profile Photo (click the pfp to change)
                </p>
                <label htmlFor="uploadprofile">
                  <img src={deafultpfp} alt="" className="z-20 h-48" />
                  <input
                    type="file"
                    name=""
                    id="uploadprofile"
                    accept=".jpg, .png, .jepg"
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="w-3/4 h-full space-y-5 ">
            <p className="text-xl font-bold">About You</p>
            <div className="space-y-4">
              <div className="space-y-1 ">
                <label className="font-semibold block">
                  Profile Bio (About you)
                </label>
                <textarea
                  className="w-full outline-none border rounded-lg bg-slate-100 p-4 hover:border-blue-500 hover:bg-white"
                  placeholder="I am a developer from ...."
                  rows={8}
                ></textarea>
              </div>
              <div className="space-y-1">
                <label className="font-semibold block">Tech Stack</label>
                <input
                  className="w-full p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white "
                  placeholder="Search for technologies, topics,more..."
                  value={techstack}
                  onChange={handletechstack}
                  ref={stackRef}
                />

                <div className="p-1 bg-white opacity-100 absolute space-y-2 w-full">
                  {!techstack.length || finaltechstack.length >=5
                    ? null
                    : predicated.map((tech, index) => (
                        <div
                          key={index}
                          className="p-1 hover:bg-gray-300"
                          onClick={handleOnClickOnTechstack}
                        >
                          {tech}
                        </div>
                      ))}
                </div>
                
                <div className="flex flex-wrap">
                  {!finaltechstack.length 
                    ? null
                    : finaltechstack.map((tech, index) => (
                        <div
                          key={index}
                          className="p-1 "
                        >
                          {tech}
                        </div>
                      ))}
                </div>
              </div>
              <div className="space-y-1 realtive">
                <label className="font-semibold block">Available</label>
                <textarea
                  className="w-full outline-none border rounded-lg bg-slate-100 p-4 hover:border-blue-500 hover:bg-white "
                  placeholder="I am available for mentoring ...."
                  rows={8}
                ></textarea>
              </div>
            </div>
          </div>
</div>
        
      </>
    );
}
export default Usersinfo;
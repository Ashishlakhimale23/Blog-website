import  {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import  { Authcontext } from "../context/context.js";
import { useContext,useEffect } from "react";
import axios from 'axios';
function Header() {
  
const {logged,setLogged} = useContext(Authcontext);
  useEffect(()=>{
    let authtoken = localStorage.getItem("authtoken")
    console.log(authtoken)
if (authtoken === undefined) {
    setLogged(false); // User is not logged in
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`;
    setLogged(true); // User is logged in
  } 
   },[setLogged])
 
 
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div className="lg:hidden z-1000">
        <nav
          className={`absolute inset-0 transform lg:transform-none lg:opacity-100 duration-200 lg:relative z-10 w-80 bg-white text-white h-screen p-3 shadow-md ${
            open
              ? "translate-x-0  ease-in opacity-100"
              : "-translate-x-full ease-out opacity-0"
          }`}
        >
          <div className="flex justify-between">
            <span className="font-bold text-2xl sm:text-3xl p-2 text-black">
              Sidebar
            </span>
            <button
              className="p-2 focus:outline-none  rounded-md lg:hidden"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <ul className="mt-8 ">
            <li>
                           
            </li>
          </ul>
        </nav>
      </div>
      <div className="relative z-0 lg:flex-grow ">
        <header className="flex bg-white text-white items-center px-3 shadow-md h-16 justify-between">
          <button
            className="p-2 focus:outline-none  rounded-md lg:hidden"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="text-xl font-bold flex items-center lg:pl-28 space-x-6 grow justify-center md:justify-center md:grow-0">
            <div>
            <span className="text-black">Get</span>
            <span className="text-orange-600">better</span>
            <span className="text-gray-400">*</span>
</div>
           <div className='space-x-2 flex md:justify-center'>
            <input type="search" placeholder='Search...' className='hidden md:flex text-black bg-gray-100 p-2 rounded-md outline-none text-base font-normal placeholder:text-black w-96 '/>
            <button>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='w-6 h-9 text-gray-400 '>
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            </button>
          </div>
          </div>
          
          <div className="space-x-2 lg:space-x-10 lg:pr-28 flex ">
            <button className='hidden md:flex text-gray-600 p-2 font-medium items-center bg-gray-100  rounded-md hover:ring-gray-300 hover:ring-2'style={{display :logged ?"none":"block"}} onClick={()=>{navigate("/createpost")}}>Create Post</button>
            <img src="https://i.pinimg.com/564x/0c/ec/fa/0cecfa5bd56a3a089467769c9ede571e.jpg" alt="" className='h-12 rounded-full lg:mr-7 '/>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
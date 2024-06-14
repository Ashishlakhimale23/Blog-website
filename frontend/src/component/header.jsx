import  {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import  { Authcontext, UserContext} from "../context/context.js";
import { useContext} from "react";
import { getdate } from '../utils/date.js';
import axios from 'axios';
function Header() {
  
const {logged,setLogged,setAuthToken} = useContext(Authcontext);
const [open,setOpen] = useState(false) 
const {initialinfo,setInitialinfo} = useContext(UserContext)


  const navigate = useNavigate();
  useEffect(()=>{

       setAuthToken(localStorage.getItem("authtoken")) 
  })
  useEffect(()=>{
     
    if(open){
      console.log(open)
      document.body.style.overflow='hidden'
    }
    else{
      document.body.style.overflow='visible'
    }
  },[open])
useEffect(()=>{
    async function fetchuserinfo(){
     await axios.get("http://localhost:8000/user/getuserinfo").then((response)=>{
       console.log(response)
      setInitialinfo({
        ...initialinfo,
        username: response.data.userinfo.username,
        pfplink: response.data.userinfo.pfplink,
        email: response.data.userinfo.email,
        aboutyou: response.data.userinfo.about,
        github: response.data.userinfo.github,
        twitter: response.data.userinfo.twitter,
        techstack: response.data.userinfo.techstack,
        blogs: response.data.userinfo.blogs,
        draft: response.data.userinfo.draft,
        joinedOn:getdate(response.data.userinfo.joinedOn)
      });

    })

    }
    
    fetchuserinfo()

 },[])
  return (
    <>
      <div className=" ">
        <header className="flex w-full px-2 font-display bg-silver text-black justify-between border-b-4 border-black lg:px-32 md:px-24 sm:px-10 fixed top-0  ">
          <div className="font-bold flex items-center">
            <div className='text-xl md:text-[28px]'>
              <span >Get</span>
              <span >better</span>
              <span >*</span>
            </div>
          </div>

          <div className="space-x-2 flex items-center">
           
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-9 text-black font-display font-bold"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            
            <button
              className="hidden p-4 font-bold text-xl items-center hover:bg-black hover:text-white"
              style={{ display: logged ? "block" : "none" }}
              onClick={() => {
                
                navigate("/createpost");
              }}
            >
              Create Post
            </button>

            <button
              className="hidden p-4 font-bold text-xl items-center hover:bg-black hover:text-white"
              style={{ display: logged ? "none" : "block" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="hidden p-4 font-bold text-xl items-center hover:bg-black hover:text-white"
              style={{ display: logged ? "none" : "block" }}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Create Account
            </button>
            <img
              src="https://i.pinimg.com/564x/0c/ec/fa/0cecfa5bd56a3a089467769c9ede571e.jpg"
              alt=""
              className="h-12 rounded-full  "
              style={{ display: logged ? "block" : "none" }}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
        </header>

        <div
          className={ `w-11/12 ml-6 mt-4 mb-4 flex-col fixed bottom-0 right-0 left-0  bg-silver  shadow-md  rounded-lg font-display sm:w-80  sm:left-auto sm:right-4 sm:bottom-auto`}
          style={{ display: open ? "block" : "none" }}
          
        >
          <div className="flex space-x-2 hover:bg-black rounded-t-lg hover:text-white p-4 border-b-4 border-black" onClick={()=>{
            navigate("/userprofile")
            setOpen(false)}
        }>
            <img
              src="https://i.pinimg.com/564x/0c/ec/fa/0cecfa5bd56a3a089467769c9ede571e.jpg"
              className="h-11 rounded-full hover:opacity-80"
            />
            <div>
              <p className="font-semibold">Ashishlakhimale</p>
              <p className="text-sm  font-display ">@ashishlakhimale23</p>
            </div>
          </div>
       
          <div className="flex space-x-2 hover:bg-black hover:text-white border-b-4 border-black p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p className="">My draft</p>
          </div>
          <div className=" flex space-x-2 hover:bg-black hover:text-white border-b-4 border-black p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>

            <p className=" ">Bookmarks</p>
          </div>
          <div className=" flex space-x-2 hover:bg-black hover:text-white border-b-4 border-black p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <p className=" ">Manage blogs</p>
          </div>
          <div className=" flex space-x-2 hover:bg-black hover:text-white border-b-4 border-black p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p className=" ">Reading history</p>
          </div>
          <div className="rounded-b-lg  flex space-x-2 hover:bg-black hover:text-white p-4" onClick={()=>{
            localStorage.removeItem("authtoken")
            setLogged(false);
            setOpen(false);
            navigate('/login ')
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>

            <p className="font-display ">
              Log out
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
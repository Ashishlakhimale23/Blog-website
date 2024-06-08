import  {useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import  { Authcontext, Openornot } from "../context/context.js";
import { useContext} from "react";
import axios from 'axios';
function Header() {
  
const {logged,setLogged,setAuthToken} = useContext(Authcontext);
const {open,setOpen} = useContext(Openornot); 

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
  return (
    <>
      <div className=" lg:flex-grow ">
        <header className="flex bg-white text-white items-center px-3 shadow-md h-16 justify-between">
          <div className="text-xl font-bold flex items-center lg:pl-28 space-x-6 grow justify-center md:justify-center md:grow-0 ">
            <div>
              <span className="text-black">Get</span>
              <span className="text-orange-600">better</span>
              <span className="text-gray-400">*</span>
            </div>
          </div>

          <div className="space-x-2 lg:space-x-10 lg:pr-28 flex ">
            <div className="space-x-2 flex md:justify-center">
              <input
                type="search"
                placeholder="Search..."
                className="hidden md:flex text-black bg-gray-100 p-2 rounded-md outline-none text-base font-normal placeholder:text-black w-96 "
              />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-9 text-gray-400 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
            <button
              className="hidden md:flex text-gray-600 p-2 font-medium items-center bg-gray-100  rounded-md hover:ring-gray-300 hover:ring-2"
              style={{ display: logged ? "block" : "none" }}
              onClick={() => {
                console.log(logged);
                navigate("/createpost");
              }}
            >
              Create Post
            </button>

            <button
              className="hidden md:flex text-gray-600 p-1 md:p-2 font-medium items-center bg-gray-100  rounded-md hover:ring-gray-300 hover:ring-2"
              style={{ display: logged ? "none" : "block" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="hidden md:flex text-gray-600 p-2 font-medium items-center bg-gray-100  rounded-md hover:ring-gray-300 hover:ring-2"
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
              className="h-12 rounded-full lg:mr-7 "
              style={{ display: logged ? "block" : "none" }}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
        </header>

        <div
          className={ `w-11/12 ml-6 mt-4 mb-4 flex-col fixed bottom-0 right-0 left-0 space-y-4 bg-white shadow-md  p-4  rounded-lg font-display sm:w-80  sm:left-auto sm:right-4 sm:bottom-auto`}
          style={{ display: open ? "block" : "none" }}
          
        >
          <div className="flex space-x-2 hover:bg-gray-200 p-1" onClick={()=>{
            navigate("/username")
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
          <hr />
          <div className="flex space-x-2 hover:bg-gray-200 p-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 text-gray-500 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p className="text-gray-500 ">My draft</p>
          </div>
          <div className="flex space-x-2 hover:bg-gray-200 p-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>

            <p className="text-gray-500 ">Bookmarks</p>
          </div>
          <div className="flex space-x-2 hover:bg-gray-200 p-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <p className="text-gray-500 ">Manage blogs</p>
          </div>
          <div className="flex space-x-2 hover:bg-gray-200 p-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              className="h-5 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p className="text-gray-500 ">Reading history</p>
          </div>
          <hr />
          <div className="flex space-x-2 hover:bg-gray-200 p-1 " onClick={()=>{
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
              className="h-5 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>

            <p className="font-display text-gray-500 hover:text-red-500">
              Log out
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
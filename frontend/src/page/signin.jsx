import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast"
import joi from "joi"
import axios from "axios";
function Signin() {
  const schema = joi.object({
    username:joi.string(),
    email: joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_]{1,28}[a-zA-Z0-9]$'
)),

    })
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const triggerhandel = useCallback(async () => {
    
  }, [password, username]);

  const handelsubmit = useCallback((e)=>{
    e.preventDefault()
  },
    
    
    [triggerhandel],
  );

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center">
        <form
          action=""
          onSubmit={handelsubmit}
          className=" relative sm:w-96 mx-auto text-center"
        >
          <div className="text-3xl font-bold mb-3">
            <span className="text-black">Get</span>
            <span className="text-orange-600">better</span>
            <span className="text-gray-400">*</span>
          </div>
          <label className="text-2xl font-bold">Join the Community</label>
          <div className="mt-4  bg-white shadow-lg  rounded-lg ">
            <div className="px-3 py-4">
              <label className="block font-semibold text-left">Email</label>
              <input
                type="email"
                placeholder="email"
                className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block font-semibold text-left">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="block mt-2 font-semibold text-left">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5 mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="px-5 py-3 bg-indigo-500 mt-2 text-white rounded-md hover:bg-indigo-400"
                >
                  Signup
                </button>
                <a
                  href="/login"
                  className="font font-semibold hover:underline hover:text-indigo-600"
                >
                  login
                </a>
              </div>
            </div>
            
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}
export default Signin;
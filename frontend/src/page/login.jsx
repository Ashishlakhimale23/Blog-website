import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";
import Joi from "joi";
import { Authcontext } from "../context/context";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {logged,setLogged} = useContext(Authcontext)
  const schema = Joi.object({
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}),
    password:Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{3,30}$')),
  })

 const handelsubmit = useCallback(async (e) => {
  e.preventDefault();
  const userInput = {
    email:email,
    password:password
   }
  const result =  schema.validate(userInput,{abortEarly:false})
if(Object.keys(result).includes("error")){
      return toast.error("Validation error")
    }
  if(!email.length){
    return toast.error("Enter the email")
  }
  if(!password.length){
    return toast.error("Enter the password")
  }

  await axios.post("user/login",userInput)
  .then((response)=>{
    if(Object.keys(response.data).includes("Notfound")){
      return toast.error(response.data.Notfound)
    }
    if(Object.keys(response.data).includes("password")){
      return toast.error(response.data.password)
    }
    if(Object.keys(response.data).includes("token")){
      localStorage.setItem("authtoken",response.data.token)
      setLogged(true)
    }
    if(Object.keys(response.data).includes("Error")){
      return toast.error("An Error occured")
    }
  })



}, [email,password]);
 
useEffect(()=>{
  if(logged){
    navigate("/home")
  }
},[logged])
  return (
    <>
    <div className="min-h-screen flex flex-col justify-center font-display">
      <form
        action=""
        className=" relative sm:w-96 mx-auto text-center"
        onSubmit={handelsubmit}
      >
        <label className="text-4xl font-bold block">Welcome back.</label>
        <label htmlFor="">Dont have an account ? <a href="/signin" className="underline hover:text-silver">Sign up</a></label>
        <div className="mt-4 bg-white  rounded-lg border-4 border-black shadow-custom">
          <div className="px-3 py-4">
            <label className="block font-semibold text-left">
               Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="mt-2  hover:outline-none focus:outline-none w-full bg-white border-2 border-black h-5 rounded-md px-4 py-5"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label className="block mt-2  font-semibold text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="mt-2  hover:outline-none focus:outline-none w-full h-5 border-2 bg-white border-black rounded-md px-4 py-5"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="flex justify-between items-baseline">
              <button
                type="submit"
                className=" px-5 py-3 bg-white mt-2 text-black rounded-md  border-4 border-black hover:bg-black hover:text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <Toaster/>
      </>
  );
}
export default Login;
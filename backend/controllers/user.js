import User from "../model/user.js";
import bcrpty from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

export async function handlesignin(req, res) {

  const {username,email,password} = req.body;
  console.log(req.body)
  let result ;

  const saltRounds = 10;

    await bcrpty.hash(password, saltRounds).then(response=>result=response).catch(error=>console.log(error))
try{      
    await   User.create({
          username,
          email,
          password:result, 
        }).then(r=>res.json({created:username}) ).catch(error=>console.log(error))}
        catch(error){
            console.log(error)
            return res.json({errorcreating:error})
        }
   
 }

export async function handlelogin(req,res) {
  const {email,password} = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ task: "signinplease" });
  } else {
    const result = await bcrpty.compare(password, user.password);

    if (result===true) {
      const token = jwt.sign(
        { email: email, password: user.password ,id:user._id },
        process.env.SECRET_KEY,);
      return res.json({"token": token});
    }
    else{
    return res.json({ task: "incorrectpassword" }).end();}
  }
}

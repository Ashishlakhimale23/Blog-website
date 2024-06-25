import User from "../model/user.js";
import bcrpty from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

export async function handlesignin(req,res) {

  const {username,email,password} = req.body;

  let result ;
  const alreadyin = await User.findOne({email:email})
  if(alreadyin){
    return res.json({Alreadysignedup:username})
  }

  const saltRounds = 10;

    await bcrpty.hash(password, saltRounds).then(response=>result=response).catch(error=>{return res.json({Error:error})})
try{      
    await   User.create({
          username,
          email,
          password:result, 
        })
        .then( (r)=>{
       const token =  jwt.sign(
       { email: email, password: password ,id:r._id },
        process.env.SECRET_KEY)
       return res.json({created:username,token:token})
    })
        .catch(error=>{return res.json({Error:error})})}
        catch(err){
          
            return res.json({Error:err})
        }
   
 }

export async function handlelogin(req,res) {
  const {email,password} = req.body;
 try{ 
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ Notfound: 'User not found' });
  } else {
    const result = await bcrpty.compare(password, user.password);

    if (result) {
      const token = jwt.sign(
        { email: email, password: user.password ,id:user._id },
        process.env.SECRET_KEY,);
      return res.json({"token": token});
    }
    else{
    return res.json({ password: "Incorrect password" }).end();}
  }}
  catch(err){
    return res.json({Error:err})
  }
}

export const handleupdateuserinfo=async (req,res)=>{
  const formdata = req.body;
  const user = req.user
  await User.findByIdAndUpdate(user,formdata).then((resp)=>{
    return res.json({task:"completed"})
  }).catch(err=>{
    return res.json({task:"failed"})
 } )

}

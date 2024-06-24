import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config()
export async function userverification(req,res,next){
     
    const auth =req.headers.authorization || req.headers.Authorization;
 console.log(auth)
if (!auth?.startsWith("Bearer")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
try {
    const decoded = jwt.verify(Token,process.env.SECRET_KEY);
req.user = decoded.id;
    next();
     
} catch (error) {
    console.error("Token verification failed:", error);
    return res.status(400).json({ "status": "Unauthorized" });
}

}




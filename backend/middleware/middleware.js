import jwt from 'jsonwebtoken';

export async function userverification(req,res,next){
     
    const auth =req.headers.authorization || req.headers.Authorization;

    console.log(auth)
if (!auth?.startsWith("Bearer")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
try {
    const decoded = jwt.verify(Token,"23032004");
    console.log(decoded)
    console.log(decoded.id)
req.user = decoded.id;
    next();
     
} catch (error) {
    console.error("Token verification failed:", error);
    return res.status(400).json({ "status": "Unauthorized" });
}

}




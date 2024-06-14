import express from "express"
import {handlesignin,handlelogin,handleupdateuserinfo} from "../controllers/user.js"
import { handlecreateblog, handlegetblogs,handlegetuserinfo } from "../controllers/blogs.js"
import {userverification} from "../middleware/middleware.js"
export const router = express.Router()
//users
router.post("/signin",handlesignin)
router.post("/login",handlelogin)
//blogs
router.post("/createblog",userverification,handlecreateblog)
router.get("/getblogs",userverification,handlegetblogs)
router.get("/getuserinfo",userverification,handlegetuserinfo)
router.put("/updateuserinfo",userverification,handleupdateuserinfo)
export default router


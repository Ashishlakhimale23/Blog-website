import express from "express"
import {handlesignin,handlelogin} from "../controllers/user.js"
import { handlecreateblog } from "../controllers/blogs.js"
import {userverification} from "../middleware/middleware.js"
export const router = express.Router()
//users
router.post("/signin",handlesignin)
router.post("/login",handlelogin)
//blogs
router.post("/createblog",userverification,handlecreateblog)

export default router


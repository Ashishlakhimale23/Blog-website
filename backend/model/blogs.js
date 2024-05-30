import mongoose from "mongoose"

const blogs = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:[],
        required:true
    },
    banner:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    Published:{
        type:Boolean,
        required:true
    },
    activities:{
        total_read:{
            type:Number,
            default:0
        }
    },
        

},{timestamps:{
    createdAt:"publishedOn",
}})
const Blog = mongoose.model("Blog",blogs)
export default Blog
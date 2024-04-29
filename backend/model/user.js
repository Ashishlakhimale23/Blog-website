import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  accountinfo:{
    total_reads:{
      type:Number,
      default:0
    },
    total_post:{
      type:Number,
      default:0
    }
  }, 
  blogs:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
   } 
  ]
});
 const User = mongoose.model("User",user)
export default User

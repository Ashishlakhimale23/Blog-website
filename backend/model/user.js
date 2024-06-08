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
  image:{
    type:String,
    default:"https://res.cloudinary.com/ddweepkue/image/upload/v1715528905/w7st3gwuluylghsal3ob.jpg"
  },
  about:{
    type:String,
  },
  description:{
    type:String,
  },
  techstack:{
    type:[String]
  },
  sociallinks:{
    twitter:{
      type:String,
    },
    facebook:{
      type:String,
    },
    instagram:{
      type:String
    },
    github:{
      type:String
    },
    linkedin:{
      type:String,
    },
    youtube:{
      type:String,
    }


  }, 
  draft:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  }],
  blogs:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
   } 
  ]
},{timestamps:{
  createdAt:"joinedOn"
}});
 const User = mongoose.model("User",user)
export default User

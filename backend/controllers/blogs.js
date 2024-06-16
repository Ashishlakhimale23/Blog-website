import Blog from "../model/blogs.js";
import User from "../model/user.js";

export const handlecreateblog=(req,res)=>{
    const autherid = req.user;
    console.log(autherid)
    const {title,content,result,banner} = req.body;

    console.log(req.body)
    if(!banner.length){
        return res.status(403).json({error:'You must add banner to the blog'})
    }
    if(!title.length){
        return res.status(403).json({error:'You must add title to the blog'})
    }
    if(!content.length){
        return res.status(403).json({error:"No content provided"})
    } 
    

    let blog = new Blog({
        title,content,banner,author:autherid,Published:result
    })
    blog.save().then((blogs)=>{
        if(result){
          User.findByIdAndUpdate(
            { _id: autherid },
            {
              $inc: { "accountinfo.total_post": 1 },
              $push: { blogs: blogs._id },
            }
          )
            .then((user) => {
              console.log(user);
              return res.status(200).json({ status: "done" });
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ error: "failed to update the blog post" });
            });
        }
        else{
User.findByIdAndUpdate(
            { _id: autherid },
            {
              $push: { draft: blogs._id },
            }
          )
            .then((user) => {
              console.log(user);
              return res.status(200).json({ status: "done" });
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ error: "failed to update the blog post" });
            });

        }
        }

    ).catch(err=>{return res.status(500).json({error:"failed to upload the blog"})})
}

export const handlegetblogs=async(req,res)=>{
  await Blog.find({Published:true}).populate("author","username pfplink")
  .then((resp)=>{
    console.log(resp);
    return res.json({blogs:resp})
  })

}

export const handlegetuserinfo = async (req,res)=>{
  const userid = req.user
  await User.findById(userid).select("username email pfplink  about twitter github techstack blogs draft joinedOn").populate("blogs","title content banner publishedOn").populate("draft","title content banner pusblishedOn")
  .then((resp)=>{
  return res.json({userinfo:resp})
  }).catch(error=>console.log(error))
}

export const handlegetotheruserinfo = async (req,res)=>{
  const {userid,username} = req.body;
  console.log(userid,username)
  await User.find({_id:userid,username:username}).select("username email pfplink about twitter github techstack joinedOn").populate("blogs","title publishedOn")
  .then((resp)=>{
  return res.json({userinfo:resp})
  }).catch(error=>console.log(error))
}

export const handlegetpraticularblog=async (req,res)=>{
  const {id,title} = req.body;
  console.log(id,title)
  await Blog.find({_id:id,title:title}).populate("author","username pfplink").select("title content banner publishedOn")
  .then((resp)=>{
    return res.json({blog:resp})
  }).catch(err=>{
    return res.json({error:err})
  })
}
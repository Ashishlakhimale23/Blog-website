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

export const handlegetblogs=(req,res)=>{
  const authorid = req.user;
  console.log("helloblogs")
  Blog.find({Published:true}).populate("author","username image")
  .then((resp)=>{
    console.log(resp);
    return res.json({blogs:resp})
  })


}
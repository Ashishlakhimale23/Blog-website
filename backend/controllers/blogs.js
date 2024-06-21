import Blog from "../model/blogs.js";
import User from "../model/user.js";

export const handlecreateblog=async(req,res)=>{
    const userid = req.user;
    const {title,content,result,banner,_id,changed} = req.body;
    if(!banner.length){
        return res.status(403).json({error:'You must add banner to the blog'})
    }
    if(!title.length){
        return res.status(403).json({error:'You must add title to the blog'})
    }
    if(!content.length){
        return res.status(403).json({error:"No content provided"})
    } 

    if(_id){
      console.log(_id)
      await Blog.findOneAndUpdate({_id:_id},{title,banner,content,Published:result}).then((resp)=>{
        if(changed){
      User.findOneAndUpdate({_id:userid},{$pull:{"draft":_id}}).then(()=>{
 User.findByIdAndUpdate(
   { _id: userid },
   {
     $push: { blogs:_id },
   }
 ).then(()=>{
  return res.json(
  {id:_id}
  ) })
      })

        }else{
        return res.json({id:_id})}
      }).catch(err=>{return res.json({error:err})})

    }else{
let blog = new Blog({
        title,content,banner,author:userid,Published:result
    })
    blog.save().then((blogs)=>{
        if(result){
          User.findByIdAndUpdate(
            { _id: userid },
            {
          
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
            { _id: userid },
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
  await User.findById(userid).select("username email pfplink  about twitter github techstack blogs draft joinedOn bookmarks").populate("blogs","title content banner publishedOn").populate("draft","title content banner publishedOn")
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

export const handledraftdeletion=async(req,res)=>{
  const {_id,title} = req.body;
  console.log(_id,title)
  const userid = req.user;
  await Blog.findOneAndDelete({_id:_id,title:title}).then(async(resp)=>{
    console.log(resp)
    await User.findOneAndUpdate({_id:userid},{$pull:{"draft":_id}}).then((result)=>{
        return res.json({status:"deleted"})
    }).catch((err)=>{
      return res.json({status:"deleting failed"})
    })
  })
}
export const handleblogdeletion=async(req,res)=>{
  const {_id,title} = req.body;
  console.log(_id,title)
  const userid = req.user;
  await Blog.findOneAndDelete({_id:_id,title:title}).then(async(resp)=>{
    console.log(resp)
    await User.findOneAndUpdate({_id:userid},{$pull:{"blogs":_id}}).then((result)=>{
        return res.json({status:"deleted"})
    }).catch((err)=>{
      return res.json({status:"deleting failed"})
    })
  })
}

export const handlegetbookmarks=async(req,res)=>{
  const userid=req.user;
  await User.findById({_id:userid}).select("bookmarks").populate("bookmarks","title banner content publishedOn").then((resp)=>{
    console.log(resp)
    return res.json({bookmark:resp})
  })
}

export const handlesavebookmark=async(req,res)=>{
  const {blogid} = req.body;
  const userid = req.user
  console.log(blogid)
await User.findByIdAndUpdate({_id:userid},
    {
      $push:{"bookmarks":blogid}
    }
  ).then(()=>{
    return res.json({success:id})
  }).catch((err)=>{
    console.log(err)
    return res.json({success:"failed"})

  })
}

export const handleremovebookmark=async(req,res)=>{
  const {blogid} = req.body;
  const userid = req.user
  console.log(blogid)
await User.findByIdAndUpdate({_id:userid},
    {
      $pull:{"bookmarks":blogid}
    }
  ).then(()=>{
    return res.json({success:id})
  }).catch((err)=>{
    return res.json({success:"failed"})

  })
}

export const handlegetallblogsanduser=async(req,res)=>{
  await User.find({}).select("username pfplink joinedOn").then(resp=>{
    const result = resp;
     Blog.find({Published:true}).select("title banner publishedOn _id").then((resp)=>{
       return res.json({users:result,blogs:resp})
    }).catch(err=>{return res.json({status:"failed to retrive the blogs"})})
  }).catch(err=>{return res.json({status:"failed to retrive the users"})})

}
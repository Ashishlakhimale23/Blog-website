import Blog from "../model/blogs.js";
import User from "../model/user.js";

export const handlecreateblog=(req,res)=>{
    const autherid = req.user;
    console.log(autherid)
    const {title,tags,content} = req.body;
    console.log(req.body)
    if(!title.length){
        return res.status(403).json({error:'You must add title to the blog'})
    }
    if(!tags || !Array.isArray(tags) || tags.length ){
        return res.status(403).json({error:"You must add some tags"});
    }
    if(!content.length){
        return res.status(403).json({error:"You must write some content to the blog"})
    }
    

    tags = tags.map(tag=>tag.toLowerCase());

    let blog = new Blog({
        title,tags,content,author:autherid
    })
    blog.save().then((blogs)=>
        User.findByIdAndUpdate({_id:autherid},{$inc:{"accountinfo.total_post":1},$push:{'blogs':blogs._id}})
        .then(user=>{
            return res.status(200).json({status:"done"});

        }).catch(err=>{return res.status(500).json({error:"failed to update the number"})})

    ).catch(err=>{return res.status(500).json({error:"failed to upload the blog"})})
}

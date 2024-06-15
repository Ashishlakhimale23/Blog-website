import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BlogParser from "../component/blogparser";
import { getdate } from "../utils/date";

const blogstructure={
    blogtitle:"",
    content:[],
    banner:"",
    author:{perosnalinfo:{}},
    pushlishedAt:'',
}
function BlogPage(){
    const location = useLocation()
    const [blog,setBlog] = useState(blogstructure)
    const {blogtitle,content,banner,author:{perosnalinfo:{pfplink,username}},pushlishedAt}=blog
    const {id} = location.state.data
    const {title} = useParams()
    useEffect(()=>{
        async function fetchblog(){
            await axios.post('http://localhost:8000/user/blog',{id,title}).
            then((resp)=>{
                console.log(resp.data.blog[0])
                setBlog((prevBlog)=>({
                    ...prevBlog,
                    blogtitle:resp.data.blog[0].title,
                    banner:resp.data.blog[0].banner,
                    content:resp.data.blog[0].content,
                  pushlishedAt:getdate(resp.data.blog[0].publishedOn),

                  author:{perosnalinfo:{
                    pfplink:resp.data.blog[0].author.pfplink,
                    username:resp.data.blog[0].author.username
                  }}

                }))
                console.log(blog)
            })
            .catch(err=>console.log(err))
        }
        fetchblog()
    },[])
   return (
    <div className="lg:flex lg:justify-center lg:items-center md:p-12 md:pt-0 min-h-screen mt-20">
      <div className="font-display p-6 max-w-[900px]">
        <div className="space-y-3 mb-4">
          <div className="w-full">
            <img src={banner} alt="Banner" className="aspect-video w-full" />
          </div>
          <div>
            <p className="text-2xl font-bold">{blogtitle}</p>
          </div>
          <div className="flex">
            <div>
              <img src={pfplink} alt="Profile" className="mr-2 w-12 h-12 rounded-full" />
            </div>
            <div>
              <p className="font-semibold">By {username}</p>
              <p className="font-semibold">Published on {pushlishedAt}</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          {content.map((block, i) => (
            <BlogParser key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
};
 

export default BlogPage;
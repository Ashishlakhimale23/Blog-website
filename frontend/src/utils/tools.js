import Code from "@editorjs/code"
import Embed from "@editorjs/embed" 
import List from "@editorjs/list"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import Inlinecode from "@editorjs/inline-code"
import Quote from "@editorjs/quote"
import axios from "axios"

const uploadByURL =async (e)=>{
    const link = new Promise((resolve,reject)=>{
            try{
                resolve(e)
            }
            catch(err){
                reject(e)
            }
    })
    
    return link.then(url=> {
        return{
        success: 1,
        file: { url }}
    })
 
}

const uploadImageByFile = async (e) =>{
    console.log(e)
    const formData = new FormData();
         formData.append("file", e);
         formData.append("upload_preset", "coursefiles"); 
         formData.append("api_key", "993344952783557"); 
         
        return await axios.post(`https://api.cloudinary.com/v1_1/ddweepkue/image/upload`,formData).then(response =>{if(response){
            const url = response.data.secure_url;
            return{
            success:1,
            file:{url}

            }
         } })

}
const tool = {
    embed:Embed,
    code:Code,
    list:{
        class:List,
        inlineToolbar:true
    },
    quote:{
        class:Quote,
        inlineToolbar:true

    },
    inlineCode:Inlinecode,
    header:{
        class:Header,
        config:{
            placeholder:"Type heading...",
            levels: [2, 3, 4],
            defaultLevel:2,
            inlineToolbar:true
        }
        
        
    },
    image:{
        class:Image,
        config:{
            uploader:{
                uploadByUrl:uploadByURL,
                uploadByFile:uploadImageByFile
            }
        }
    }
}
export default tool;
export function contentparser(content){
    let {type,data} = content;
    if(type == "paragraph"){
       console.log(data.text) 
    }

}
import { useState } from "react";
import editorjs from "editorjs-html" 


function Card({banner,title,editorjs_data,author,activities}){
  const {username,image} = author
  
  console.log(title)
const handlebookmark = ()=>{
    setSaved(!saved)
}
    const [saved,setSaved] = useState(false);
    return (
      <div className="w-full md:w-[700px] space-y-2 p-2 lg:justify-center lg:border lg:p-6 lg:rounded-2xl  flex-shrink-0 h-fit antialiased">
        <div className="flex items-center space-x-2 ">
          <img
            src={image}
            className="h-11 rounded-full "
          />
          <p className="font-medium text-lg">{username}</p>
        </div>

        <div className="space-y-2 md:flex md:justify-between md:space-x-2">
          <div className="md:w-2/3 md:max-h-36 ellipsis-3">
            <p className="text-xl font-bold leading-7 mb-1">
              {title}
            </p>
            <p className=" hidden md:block leading-7">
              
            </p>
          </div>
          <div className="flex-shrink-0 md:w-1/3">
            <img
              src={banner}
              alt="Descriptive alt text"
              className="w-full h-full rounded-md md:h-36 object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <p className="">date holder</p>
          <div>
            {saved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={handlebookmark}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={handlebookmark}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                />
              </svg>
            )}
            
          </div>
        </div>
      </div>
    );
}
export default Card ;
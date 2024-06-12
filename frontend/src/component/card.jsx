import {  useState  } from "react";
import {getdate} from "../utils/date"
import {useNavigate} from "react-router-dom"


function Card({banner,title,content,author,activities,publishedOn}){
  let navigate = useNavigate();

  const {username,image} = author;
  let date =  getdate(publishedOn);



const handlebookmark = ()=>{
    setSaved(!saved)
}
    const [saved,setSaved] = useState(false);
    return (
      <div className="w-full space-y-4 flex-shrink-0 antialiased font-display border-black border-4 shadow-custom max-w-[600px]">
        <div className="flex-shrink-0 ">
          <img
            src={banner}
            alt="Descriptive alt text"
            className="w-full lg:h-72 object-cover border-b-4 border-black "
          />
        </div>

        <div className="pl-2 pr-2">
          <div className=" leading-6  line-clamp-4 overflow-ellipsis  ">
            <p className="text-2xl font-bold mb-1">{title}</p>
            <p className=" text-black font-medium">
              I was working on a web development project, building a 3D
              visualizer. This project required a lot of calculations and data
              processing. I used JavaScript, my go-to language for web
              development. At first, everything went well. But as I added more
              features, the website started to slow down. The rendering times
              increased, and the animations became choppy.
            </p>
          </div>
        </div>

        <div className="flex  justify-between pl-2 pr-2 pb-2">
          <div className="flex space-x-2">
            <img
              src="https://i.pinimg.com/564x/0c/ec/fa/0cecfa5bd56a3a089467769c9ede571e.jpg"
              className="h-11 rounded-md hover:opacity-80"
            />
            <div>
              <p className="font-semibold">{username}</p>
              <p className="text-sm  font-display ">{date}</p>
            </div>
          </div>
          <div className="flex items-center ">
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
      </div>
    );
}
export default Card ;
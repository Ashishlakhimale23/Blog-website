import { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/context"
import axios from "axios"
import {getdate} from "../utils/date"
export function UserProfile(){

 const {info,setInfo,initialinfo,setInitialinfo} = useContext(UserContext);
 
const {
  username,
  email,
  pfplink,
  aboutyou,
  available,
  github,
  instagram,
  facebook,
  linkedin,
  youtube,
  twitter,
  techstack,
  blogs,
  draft,
  joinedOn
}=initialinfo

 useEffect(()=>{
    async function fetchuserinfo(){
     await axios.get("http://localhost:8000/user/getuserinfo").then((response)=>{

      setInitialinfo({
        ...initialinfo,
        username: response.data.userinfo.username,
        pfplink: response.data.userinfo.pfplink,
        email: response.data.userinfo.email,
        aboutyou: response.data.userinfo.aboutyou,
        available: response.data.userinfo.available,
        github: response.data.userinfo.github,
        instagram: response.data.userinfo.instagram,
        facebook: response.data.userinfo.facebook,
        linkedin: response.data.userinfo.linkedin,
        youtube: response.data.userinfo.youtube,
        twitter: response.data.userinfo.twitter,
        techstack: response.data.userinfo.techstack,
        blogs: response.data.userinfo.blogs,
        draft: response.data.userinfo.draft,
        joinedOn:getdate(response.data.userinfo.joinedOn)
      });

    })

    }
    
    fetchuserinfo()

 },[])

    return (
      <>
        <div className="w-full h-full p-10 pl-5 pr-5 space-y-8">
          <div className="w-full h-fit space-y-3">
            <div>
              <img src={pfplink} alt="" className="w-28 h-28 rounded-full" />
            </div>

            <div className="">
              <p className="text-2xl font-display font-bold ">{username}</p>
            </div>

            <div className="">
              <button className="mr-3 pr-8 pl-8 p-2 align-middle rounded-3xl bg-blue-600 text-white font-semibold">
                Edit
              </button>
              <button className="align-middle p-2 rounded-full border ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full border rounded-lg p-6 space-y-3">
            <div className="space-x-2" style={{display:linkedin.length || instagram.length || github.length || facebook.length || twitter.length || youtube?"block":"none"}} >
              <a href={linkedin}>
                <button
                  className="rounded-full p-2 hover:bg-gray-300 "
                  style={{ display: linkedin ? "block" : "none" }}
                  
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="linkedin"
                    className="h-4"
                  >
                    <path d="M0 5h3.578v11H0zM13.324 5.129c-.038-.012-.074-.025-.114-.036a2.32 2.32 0 0 0-.145-.028A3.207 3.207 0 0 0 12.423 5c-2.086 0-3.409 1.517-3.845 2.103V5H5v11h3.578v-6s2.704-3.766 3.845-1v7H16V8.577a3.568 3.568 0 0 0-2.676-3.448z"></path>
                    <circle cx="1.75" cy="1.75" r="1.75"></circle>
                  </svg>
                </button>
              </a>
              <a href={twitter}>
                <button
                  className="rounded-full p-2 hover:bg-gray-300"
                  style={{ display: twitter ? "block" : "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 1668.56 1221.19"
                    viewBox="0 0 1668.56 1221.19"
                    id="twitter-x"
                    className="h-4"
                  >
                    <path
                      d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                      transform="translate(52.39 -25.059)"
                    ></path>
                  </svg>
                </button>
              </a>
              <a href={github}>
                <button
                  className="rounded-full p-2 hover:bg-gray-300"
                  style={{ display: github ? "block" : "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="github"
                    className="h-4"
                  >
                    <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
                  </svg>
                </button>
              </a>
              <a href={instagram}>
                <button
                  className="rounded-full p-2 hover:bg-gray-300"
                  style={{ display: instagram ? "block" : "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="instagram"
                    className="h-4"
                  >
                    <path d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"></path>
                    <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path>
                    <circle cx="12.3" cy="3.7" r=".533"></circle>
                  </svg>
                </button>
              </a>
              <a href={youtube}>
                <button
                  className="rounded-full p-2 hover:bg-gray-300"
                  style={{ display: youtube ? "block" : "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="youtube"
                    className="h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15.32 4.06c-.434-.772-.905-.914-1.864-.968C12.498 3.027 10.089 3 8.002 3c-2.091 0-4.501.027-5.458.091-.957.055-1.429.196-1.867.969C.23 4.831 0 6.159 0 8.497v.008c0 2.328.23 3.666.677 4.429.438.772.909.912 1.866.977.958.056 3.368.089 5.459.089 2.087 0 4.496-.033 5.455-.088.959-.065 1.43-.205 1.864-.977.451-.763.679-2.101.679-4.429v-.008c0-2.339-.228-3.667-.68-4.438zM6 11.5v-6l5 3-5 3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </a>
              <a href={facebook}>
                <button
                  className="rounded-full p-2 hover:bg-gray-300"
                  style={{ display: facebook ? "block" : "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="facebook"
                    className="h-4"
                  >
                    <path d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h6v-5.5H6V8h2V6a3 3 0 0 1 3-3h2v2.5h-1c-.552 0-1-.052-1 .5v2h2.5l-1 2.5H11V16h3c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"></path>
                  </svg>
                </button>
              </a>
            </div>
            <div className="space-x-2 p-1 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <p className="font-display">Member Since {joinedOn}</p>
            </div>
          </div>
          <div className="wfull h-fit">
            <div className="border p-6 mb-3 rounded-lg min-h-44">
              <p className="text-xl font-bold mb-2">About Me</p>
              <p className="font-display text-gray-400">
                {aboutyou
                  ? aboutyou
                  : "Your bio is empty. Tell the world who you are by writing a short description about you."}
              </p>
            </div>
            <div className="border p-6 mb-3 rounded-lg min-h-44">
              <p className="text-xl font-bold mb-2">My Tech Stack</p>
              <p className="font-display text-gray-400">
                {aboutyou
                  ? aboutyou
                  : "Your bio is empty. Tell the world who you are by writing a short description about you."}
              </p>
            </div>
            <div className="border p-6 mb-3 rounded-lg min-h-44">
              <p className="text-xl font-bold mb-2">I am available for</p>
              <p className="font-display text-gray-400">
                {available
                  ? available 
                  : "Tell the world what are you available for."}
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

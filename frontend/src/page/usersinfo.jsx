import { useRef, useState , useEffect, useContext} from "react";
import deafultpfp from "../img/deafultpfp.jpg"
import techStack from "../utils/suggestion";
import { UserContext } from "../context/context";
function Usersinfo(){
 const {
   twitter,
   setTwitter,
   instagram,
   setInstagram,
   github,
   setGithub,
   facebook,
   setFacebook,
   linkedin,
   setLinkedin,
   youtube,
   setYoutube,
   aboutyou,
   setAboutyou,
   available,
   setAvailable,
   finaltechstack,
   setFinaltechstack,
   pfplink,
   setPfplink,
 } = useContext(UserContext);

  const [predicated, setPredicated] = useState([]);

  const [techstack, setTechstack] = useState("");
  const stackRef = useRef();
  const pfpRef = useRef();

  const getpredicatedvalue = (value) => {
    const flitered = techStack.filter(
      (item) => item.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setPredicated(flitered.slice(0, 5));
  };

  const handletechstack = (e) => {
    setTechstack(e.target.value);
    getpredicatedvalue(e.target.value);
  };

  const handleOnClickOnTechstack = (e) => {
    if (finaltechstack.length <= 5) {
      setFinaltechstack([...finaltechstack, e.target.innerText]);
      setTechstack("");
    }

    stackRef.current.placeholder = "Only five allowed";
  };

  const handleOnClickDeleteTech = (e) => {
    const updatedarray = finaltechstack.filter(
      (item) => item != e.currentTarget.parentElement.firstChild.innerText
    );
    setFinaltechstack(updatedarray);
  };

  const handleKeyDownTechstack = (e) => {
    if (e.code == "Enter") {
      setFinaltechstack([...finaltechstack, e.target.value]);
      setTechstack("");
    }
  };

  const handlepfpchange = async (e) => {
    const filename = e.target.files[0];
    const formData = new FormData();
    formData.append("file", filename);
    formData.append("upload_preset", "coursefiles");
    formData.append("api_key", "993344952783557");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/ddweepkue/image/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setPfplink(data.secure_url);
      pfpRef.current.src = data.secure_url;
    } else {
      throw new Error("Failed to upload image"); }
  };

  const handleChangeAvailable = (e) => {
    setAvailable(e.target.value);
  };

  const handleChangeAbout = (e) => {
    setAboutyou(e.target.value);
  };

const handlechangeTwitter= (e) => {
    setTwitter(e.target.value);
  };
const handlechangeInstagram= (e) => {
    setInstagram(e.target.value);
  };
const handlechangeGithub= (e) => {
    setGithub(e.target.value);
  };
const handlechangeFacebook= (e) => {
    setFacebook(e.target.value);
  };


const handlechangeYoutube= (e) => {
    setYoutube(e.target.value);
  }
const handlechangeLinkedIn= (e) => {
    setLinkedin(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem("finaltechstack", JSON.stringify(finaltechstack));
    localStorage.setItem("pfplink", pfplink);
    localStorage.setItem("aboutyou", aboutyou);
    localStorage.setItem("available", available);

    localStorage.setItem("github", github);
    localStorage.setItem("facebook", facebook);
    localStorage.setItem("linkedin", linkedin);
    

    localStorage.setItem("youtube", youtube);
    localStorage.setItem("twitter",twitter );
    localStorage.setItem("instagram",instagram);

  }, [finaltechstack, pfplink, aboutyou, available,instagram,youtube,linkedin,twitter,facebook,github]);

  return (
    <>
      <div className="p-2 w-full h-screen space-y-5 sm:pr-10 sm:pl-10 lg:flex lg:justify-center lg:space-x-5 ">
        <div className="lg:w-1/2 p-6">
          <div className=" space-y-5 ">
            <p className="text-xl font-bold">Basic info</p>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold">User name</label>
                <p className="p-4 border hover:border-blue-500 rounded-lg ">
                  Ashishlakhimale
                </p>
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Email</label>
                <p className="p-4 border hover:border-blue-500 rounded-lg ">
                  ashishlakhimale23@gmail.com
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">
                  Profile Photo (click the pfp to change)
                </p>
                <label htmlFor="uploadprofile">
                  <img
                    src={pfplink.length != 0 ? pfplink : deafultpfp}
                    ref={pfpRef}
                    className="z-20 w-48 h-48 rounded-full"
                  />
                  <input
                    type="file"
                    name=""
                    id="uploadprofile"
                    accept=".jpg, .png, .jepg"
                    hidden
                    onChange={handlepfpchange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-5 mt-10 ">
            <p className="text-xl font-bold">About You</p>
            <div className="space-y-4">
              <div className="space-y-1 ">
                <label className="font-semibold block">
                  Profile Bio (About you)
                </label>
                <textarea
                  className="w-full outline-none border rounded-lg bg-slate-100 p-4 hover:border-blue-500 hover:bg-white "
                  placeholder="I am a developer from ...."
                  value={aboutyou}
                  rows={8}
                  onChange={handleChangeAbout}
                ></textarea>
              </div>
              <div className="relative space-y-1">
                <label className="font-semibold block">Tech Stack</label>
                <input
                  className="w-full p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white "
                  placeholder="Search for technologies, topics,more..."
                  value={techstack}
                  onChange={handletechstack}
                  onKeyDown={handleKeyDownTechstack}
                  ref={stackRef}
                />

                <div className=" bg-white rounded-xl shadow-md absolute space-y-2 z-10 w-full">
                  {!techstack.length || finaltechstack.length >= 5
                    ? null
                    : predicated.map((tech, index) => (
                        <div
                          key={index}
                          className="p-1 hover:bg-gray-300"
                          onClick={handleOnClickOnTechstack}
                        >
                          {tech}
                        </div>
                      ))}
                </div>

                <div className="flex flex-wrap  items-center mt-2">
                  {!finaltechstack.length
                    ? null
                    : finaltechstack.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center p-1 pr-2 pl-2 ring-1 hover:bg-blue-100 ring-blue-700 m-1 text-blue-600 rounded-2xl  "
                        >
                          <p>{tech} </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                            className="h-5 ml-1"
                            onClick={handleOnClickDeleteTech}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      ))}
                </div>
              </div>
              <div className="space-y-1 realtive">
                <label className="font-semibold block">Available</label>
                <textarea
                  className="w-full outline-none border rounded-lg bg-slate-100 p-4 hover:border-blue-500 hover:bg-white "
                  placeholder="I am available for mentoring ...."
                  rows={8}
                  value={available}
                  onChange={handleChangeAvailable}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5 pr-6 pl-6 lg:pl-0 lg:pt-0 lg:pb-0 lg:pr-6 lg:w-1/2">
          <p className="text-xl font-bold">Social</p>
          <div className="w-full space-y-4">
            <div className="space-y-1">
              <label className="font-semibold">Twitter Profile</label>
              <input
                type="text"
                className=" p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white w-full"
                placeholder="https://twitter.com/johndoe"
                value={twitter}
                onChange={handlechangeTwitter}
              />
            </div>
          </div>
          <div className="space-y-1 w-full">
            <label className="block font-semibold">Instagram Profile</label>
            <input
              type="text"
              className=" p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white w-full"
              placeholder="https://instagram.com/johndoe"
              value={instagram}
              onChange={handlechangeInstagram}
            />
          </div>
          <div className="space-y-1 w-full">
            <label className="block font-semibold">Github Profile</label>
            <input
              type="text"
              className="  p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white w-full"
              placeholder="https://github.com/johndoe"
              value={github}
              onChange={handlechangeGithub}
            />
          </div>
          
          <div className="space-y-1 w-full">
            <label className="block font-semibold">Facebook Profile</label>
            <input
              type="text"
              className="p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white w-full"
              placeholder="https://facebook.com/johndoe"
              value={facebook}
              onChange={handlechangeFacebook}
            />
          </div>
          <div className="space-y-1 w-full">
            <label className="block font-semibold">Linekedin Profile</label>
            <input
              type="text"
              className="p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white w-full"
              placeholder="https://linkedin.com/in/johndoe"
              value={linkedin}
              onChange={handlechangeLinkedIn}
            />
          </div>
          <div className="space-y-1 w-full">
            <label className="block font-semibold">Youtube Profile</label>
            <input
              type="text"
              className="p-4 border outline-none hover:border-blue-500 rounded-lg bg-slate-100 hover:bg-white w-full"
              placeholder="https://youtube.com/johndoe"
              value={youtube}
              onChange={handlechangeYoutube}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Usersinfo;
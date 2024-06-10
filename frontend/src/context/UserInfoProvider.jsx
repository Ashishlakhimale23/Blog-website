import { useState } from 'react';
import {UserContext} from '../context/context'
export function UserInfoProvider({children}){

const [username,setUsername] = useState("")
const [email,setEmail] = useState("");

const [pfplink, setPfplink] = useState(() => {
    const saved = localStorage.getItem("pfplink");
    return saved ? saved : "";
  });

  const [aboutyou, setAboutyou] = useState(() => {
    const saved = localStorage.getItem("aboutyou");
    return saved ? saved : "";
  });

  const [available, setAvailable] = useState(() => {
    const saved = localStorage.getItem("available");
    return saved ? saved : "";
  });

  const [twitter, setTwitter] = useState(() => {
    const saved = localStorage.getItem("twitter");
    return saved ? saved : "";
  });

  const [github, setGithub] = useState(() => {
    const saved = localStorage.getItem("github");
    return saved ? saved : "";
  });

  const [youtube, setYoutube] = useState(() => {
    const saved = localStorage.getItem("youtube");
    return saved ? saved : "";
  });
  const [linkedin, setLinkedin] = useState(() => {
    const saved = localStorage.getItem("linkedin");
    return saved ? saved : "";
  });

  const [facebook, setFacebook] = useState(() => {
    const saved = localStorage.getItem("facebook");
    return saved ? saved : "";
  });

  const [instagram, setInstagram] = useState(() => {
    const saved = localStorage.getItem("instagram");
    return saved ? saved : "";
  });

  const [finaltechstack, setFinaltechstack] = useState(() => {
    const saved = localStorage.getItem("finaltechstack");
    return saved ? JSON.parse(saved) : [];
  });
    return (
      <UserContext.Provider
        value={{
          username,
          setUsername,
          email,
          setEmail,
          finaltechstack,
          setFinaltechstack,
          twitter,
          setTwitter,
          instagram,
          setInstagram,
          github,
          setGithub,
          facebook,
          setFacebook,
          youtube,
          setYoutube,
          linkedin,
          setLinkedin,
          pfplink,
          setPfplink,
          aboutyou,
          setAboutyou,
          available,
          setAvailable
        }}
      >
        {children}
      </UserContext.Provider>
    );
}
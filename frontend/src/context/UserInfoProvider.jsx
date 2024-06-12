import { useState } from 'react';
import {UserContext} from '../context/context'
export function UserInfoProvider({children}){

const UserInfo ={
  username:"",
  email:"",
  pfplink:"",
  aboutyou:"",
  available:"",
  github:"",
  instagram:"",
  facebook:"",
  linkedin:"",
  youtube:"",
  twitter:"",
  techstack:[],
  blogs:[],
  draft:[],
  joinedOn:""
}
const [info,setInfo] = useState(()=>{
  const saved = localStorage.getItem("info")
  return saved ? JSON.parse(saved):UserInfo
})
const [initialinfo,setInitialinfo] = useState(UserInfo)
    return (
      <UserContext.Provider
        value={{
         info,setInfo,initialinfo,setInitialinfo
        }}
      >
        {children}
      </UserContext.Provider>
    );
}
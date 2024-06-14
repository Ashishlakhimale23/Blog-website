import { useState } from 'react';
import {UserContext} from '../context/context'

export function UserInfoProvider({children}){

const UserInfo ={
  username:"",
  email:"",
  pfplink:"",
  aboutyou:"",
  github:"",
  twitter:"",
  techstack:[],
  blogs:[],
  draft:[],
  joinedOn:""
}
const [info,setInfo] = useState(UserInfo)
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
import { useState } from "react"
import  { Authcontext } from "./context.js" 
function UserContext({children}){
    const [logged,setLogged] = useState(false)
    return(
        <Authcontext.Provider value={{logged,setLogged}}>{children}</Authcontext.Provider>
    )
}
export default UserContext
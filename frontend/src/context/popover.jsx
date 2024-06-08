import { useState } from "react"
import  { Openornot  } from "./context.js" 
function Popover({children}){
    const [open,setOpen] = useState(false);
    return(
        <Openornot.Provider value={{open,setOpen}}>{children}</Openornot.Provider>
    )
}
export default Popover 
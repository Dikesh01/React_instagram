import React, { useState } from "react";
import Context from "./Context";

const Provider =(props) =>{
    const [token,setToken] = useState("")

    return(
        <Context.Provider value={{token,setToken}}>
            {props.children}
        </Context.Provider>
    )
}

export default Provider;
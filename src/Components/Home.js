import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home =() =>{
    let {token,setToken} = useContext(Context)
    let [message,setMessage] = useState("")
    let [error,setError] = useState("")
    let [success,setSuccess] = useState("")
    let [name,setName] = useState("")

    const navigate = useNavigate()

    useEffect(
         ()=>{
            async function getZukuMessage(){

                try{
                    let response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",
                    { headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setMessage(response.data.data.message)
                setName(response.data.data.user.name)
                
              }
              catch(error){
                    setError(error.response.data.message)
              }

            }
          
            getZukuMessage()

    }
    ,[])

    function implementLogout(){
        
             axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",
             {headers:{
                Authorization:`Bearer ${token}`
             }
            })
            .then((response)=>{
                setToken("")
                setMessage("")
                setName("")
                setError("")
                setSuccess("")
                localStorage.removeItem('token')
                alert("Logout Successfully!")
                navigate("/login")
            })
            .catch((error)=>{
                setError(error.response.data.message)
                setSuccess("")

        })
    }

    return(
        <div className="home_div">
            {error && <h2>{error}</h2>}
            <div className="logout_div">
                <button align="right" onClick={implementLogout}>Logout</button>
                <p>Click here to logout: </p>
            </div>
            <h1>WelCome to my home! {name} </h1>
            <p><b>Zuku has a message for you :</b> {message} </p>
        </div>
    )
}

export default Home;
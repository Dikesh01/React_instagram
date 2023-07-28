import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import instaApi from "../Utilities/instaApi";

const Signup =() =>{
    let [user,setUser] = useState({
        name:"", email:"",password:"",confirmPassword:""
    })

    let [success,setSuccess] = useState("")
    let [error, setError] = useState("")
    let  {token, setToken} = useContext(Context);  // {token,setToken}

    let {name, email, password,confirmPassword} = user;
    let navigate = useNavigate()

    async function implementSignup(e){
        e.preventDefault()

        if(!name || !email || !password || !confirmPassword){
            setError("All fields are require!")
            setSuccess("")
            return;
        }
        else if(password !== confirmPassword){
            setError("Password is not matching!")
            setSuccess("")
            return;
        }

        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
                {name, email, password})

            // const response = instaApi.post("/auth/signup", {name, email, password})

                setError("")
                setSuccess(response.data.message)
                setToken(response.data.data.token)
                setUser({name:"", email:"", password:"", confirmPassword:""})
                alert("Signup Successfully!")
                navigate("/home")

        }

        catch(error){
             setError(error.response.data.message)
             setSuccess("")
        }
    }

    return(
        <div className="signup_form">
            <h1 style={{fontFamily:"cursive"}}>Instagram</h1>
            <h4>Signup Page</h4>
            <form onSubmit={implementSignup}>
                <input type="text" placeholder="Enter Your Name" 
                value={user.name} onChange={(e)=>setUser({...user,name : e.target.value})} />
                <input type="email" placeholder="Enter Your email" 
                value={user.email} onChange={(e)=>setUser({...user,email : e.target.value})} />
                <input type="password" placeholder="Enter Password" 
                value={user.password} onChange={(e)=>setUser({...user,password : e.target.value})} />
                <input type="password" placeholder="Confirm Password" 
                value={user.confirmPassword} onChange={(e)=>setUser({...user,confirmPassword : e.target.value})} />
                <button type="submit">Sign Up</button>
            </form>
            {error && <h5>{error}</h5>} 
        </div>
    )
}

export default Signup;
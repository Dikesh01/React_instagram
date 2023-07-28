import React, { useContext, useState } from "react";
import axios from "axios";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import instaApi from "../Utilities/instaApi";

const Login =() =>{
    
    let [user,setUser] = useState({
        email:"",password:""
    })

    let [success,setSuccess] = useState("")
    let [error,setError] = useState("")
    let {token,setToken} = useContext(Context)

    let navigate = useNavigate();

    let {email, password} = user;

    async function implementLogin(e){
        e.preventDefault()

        if(!email || !password){
            setError("All fields are require!")
            setSuccess("")
            return;
        }

        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login",
                {email, password})
            // const response = instaApi.post("/auth/login", {email,password})
                console.log(response.data.message);

                setError("")
                setSuccess(response.data.message)
                setToken(response.data.data.token)
                console.log(response.data.data.token)
                localStorage.setItem("token",response.data.data.token)
                setUser({email:"", password:""})
                alert("Login Successfully")
                navigate("/home");
        }

        catch(error){
            setError(error.response.data.message)
            setSuccess("")
        }
    }

    return(
        <div className="signup_form">
            
            <h1 style={{fontFamily:"cursive"}}>Instagram</h1>
            <h4>Login Page</h4>
            <form onSubmit={implementLogin}>
                <input type="email" placeholder="Enter User email" 
                value={user.email} onChange={(e)=>setUser({...user,email : e.target.value})} />
                <input type="password" placeholder="Enter Password" 
                value={user.password} onChange={(e)=>setUser({...user,password : e.target.value})} />
                <button type="submit">Log In</button>
            </form>
            {error && <h5>{error}</h5>} 
        </div>
    )
}

export default Login;
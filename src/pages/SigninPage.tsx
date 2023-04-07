import { useState } from "react";
import { UserDetails, logInRequest } from "../api/user-requests";
import { LoginForm } from "../components/login-form";
import { LoginRequest } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";

import "../css/form-styling.css"
import "../css/global-styling.css"
import "../css/nav.css"

export function SigninPage(){

    const navigate = useNavigate();
    const [logInForm, setLogInForm] = useState<LoginRequest>({email:"", password:""});
    const [errMsg, setErrMsg] = useState<String>("")
    

    async function handleSignIn(){
        try {
            const currentUser: UserDetails = await logInRequest(logInForm); 
            if(currentUser){
                localStorage.setItem("user_id", String(currentUser.userId))
                localStorage.setItem("name", currentUser.name)
                localStorage.setItem("email", currentUser.email)
                localStorage.setItem("role", currentUser.role)
                navigate("/home")
            }else {
                console.log("Invalid user returned from logInRequest");
                // handle error as needed
              }
          } catch (error) {
            setErrMsg("Invalid Email/Password")
          }
    }

    return<>
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reinbursement System</h1>
    </div>

    {errMsg.length > 0 &&
    <p>{errMsg}</p>}

    <div className="main-form-cont">
        <LoginForm logInForm={logInForm} setLogInForm={setLogInForm}/>
        <button className="form-submit-buttons" onClick={handleSignIn}>Sign In</button>
    </div>
    </>
}
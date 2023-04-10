import { useState } from "react";
import { UserDetails, logInRequest } from "../api/user-requests";
import { LoginForm } from "../components/login-form";
import { LoginRequest } from "../types/types";
import { useNavigate } from "react-router-dom";

import "../css/form-styling.css"
import "../css/global-styling.css"
import "../css/nav.css"

type UserProps = {
    setRole: 
}

export function SigninPage(props:UserProps){

    const navigate = useNavigate();
    const [logInForm, setLogInForm] = useState<LoginRequest>({email:"", password:""});
    const [errMsg, setErrMsg] = useState<String>("")
    

    async function handleSignIn(){
        try {
            const currentUser: UserDetails = await logInRequest(logInForm); 
            localStorage.setItem("name", currentUser.name)
            localStorage.setItem("email", currentUser.email)
            localStorage.setItem("role", currentUser.role)
            localStorage.setItem("token", currentUser.token)
            navigate("/home")
          } catch (error) {
            setErrMsg("Invalid Email/Password")
          }
        }

    return<>
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reimbursement System</h1>
    </div>

    {errMsg.length > 0 &&
    <p>{errMsg}</p>}

    <div className="main-form-cont">
        <LoginForm logInForm={logInForm} setLogInForm={setLogInForm}/>
        <button className="form-submit-buttons" onClick={handleSignIn}>Sign In</button>
        <button className="registration-button" onClick={()=> navigate('/register/employee')}>Register</button>
    </div>
    </>
}
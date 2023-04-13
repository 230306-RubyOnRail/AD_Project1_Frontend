import { useState } from "react";
import { UserDetails, logInRequest } from "../api/user-requests";
import { LoginForm } from "../components/login-form";
import { LoginRequest } from "../types/types";
import { useNavigate } from "react-router-dom";

import "../css/form-styling.css"
import "../css/global-styling.css"
import "../css/fixed-nav.css"

type UserProps = {
    setRole: React.Dispatch<React.SetStateAction<string>>
}

export function SigninPage(props:UserProps){

    const navigate = useNavigate();
    const [logInForm, setLogInForm] = useState<LoginRequest>({email:"", password:""});
    const [errMsg, setErrMsg] = useState<string>("")
    

    async function handleSignIn(){
        try {
            const currentUser: UserDetails = await logInRequest(logInForm); 
            localStorage.setItem("name", currentUser.name)
            localStorage.setItem("email", currentUser.email)
            localStorage.setItem("role", currentUser.role)
            localStorage.setItem("token", currentUser.token)
            props.setRole(currentUser.role)
            navigate("/home")
          } catch (error) {
            setErrMsg("Invalid Email/Password")
          }
        }

    return<>
    <div className="header-cont">
        <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        </div>
        <div className="website-name">
            <h1 >Expense Reimbursement System</h1>
        </div>
    </div>

    {errMsg.length > 0 &&
    <p className="error-msg">{errMsg}</p>}

    <div className="main-form-cont">
        <LoginForm logInForm={logInForm} setLogInForm={setLogInForm}/>
        <button className="form-submit-buttons" onClick={handleSignIn}>Sign In</button>
        <button className="registration-button" onClick={()=> navigate('/register/employee')}>Register</button>
    </div>
    </>
}
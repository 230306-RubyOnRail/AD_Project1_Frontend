import { useState } from "react";
import { UserDetails, logInRequest } from "../api/user-requests";
import { LoginForm } from "../components/login-form";
import { LoginRequest } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";

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
    <div>
        <h1>Revature ERS</h1>
    </div>
    <div>
        <LoginForm logInForm={logInForm} setLogInForm={setLogInForm}/>
        <button onClick={handleSignIn}>Sign In</button>
    </div>
    {errMsg.length > 0 &&
    <p>{errMsg}</p>   
}
    </>
}
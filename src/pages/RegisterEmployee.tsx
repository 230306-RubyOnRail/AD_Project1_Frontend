import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../types/types";
import { RegisterForm } from "../components/registration-form";
import { createEmployee } from "../api/services/account-service";

import "../css/fixed-nav.css"
import "../css/global-styling.css"


export function RegisterEmployee(){

    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState<UserForm>({name: "", email:"", password:"", role: "employee"});
    const [errMsg, setErrMsg] = useState<String>("")

    async function handleRegistration(){
        try{
            await createEmployee(registerForm);
            navigate('/')
        }catch(error){
            setErrMsg("Please submit valid account credentials")
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
        <RegisterForm registerForm={registerForm} setRegisterForm={setRegisterForm}/>
        <button className="registration-button" onClick={handleRegistration}>Register</button>
    </div>
    </>
}
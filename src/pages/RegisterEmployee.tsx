import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../types/types";
import { RegisterForm } from "../components/registration-form";
import { createEmployee } from "../api/services/account-service";


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
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reimbursement System</h1>
    </div>

    {errMsg.length > 0 &&
    <p>{errMsg}</p>}

    <div className="main-form-cont">
        <RegisterForm registerForm={registerForm} setRegisterForm={setRegisterForm}/>
        <button className="registration-button" onClick={()=> navigate('/register/employee')}>Register</button>
    </div>
    </>
}
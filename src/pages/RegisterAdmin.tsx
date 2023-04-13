import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../types/types";
import { RegisterForm } from "../components/registration-form";
import { createAdmin } from "../api/services/account-service";
import { Header } from "../components/header";
import { UserProps } from "./HomePage";


export function RegisterAdmin(props: UserProps){

    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState<UserForm>({name: "", email:"", password:"", role: "admin"});
    const [errMsg, setErrMsg] = useState<string>("")

    async function handleRegistration(){
        try{
            await createAdmin(registerForm);
            navigate('/home')
        }catch(error){
            setErrMsg("Please submit valid account credentials")
        }
    }

    return<>
    <Header role={props.role}  currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>

    {errMsg.length > 0 &&
    <p>{errMsg}</p>}

    <div className="main-form-cont">
        <RegisterForm registerForm={registerForm} setRegisterForm={setRegisterForm}/>
        <button className="registration-button" onClick={handleRegistration}>Register</button>
    </div>
    </>
}
import { useState } from "react";
import { ReimbursementForm } from "../components/reimbursement-form";
import { ReimbursementCreateType } from "../types/types";
import { createReim } from "../api/reimbursment-requests";
import { useNavigate } from "react-router-dom";


export function NewReimbursement(){

    const navigate = useNavigate();
    const [form, setForm] = useState<ReimbursementCreateType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:""})
    const [errMsg, setErrMsg] = useState<string>("")

    async function handleReimRequest(){
        try {
            console.log(form)
            await createReim(form);
            navigate('/home')
        } catch (error) {
            setErrMsg("Please complete all necessary fields in the form")
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
        <ReimbursementForm form={form} setForm={setForm}/>
        <button className="form-submit-buttons" onClick={handleReimRequest}>Request Reimbursement</button>
    </div>
    
    </>
}
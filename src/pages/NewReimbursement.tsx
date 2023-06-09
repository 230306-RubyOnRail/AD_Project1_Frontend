import { useState } from "react";
import { ReimbursementForm } from "../components/reimbursement-form";
import { ReimbursementCreateType } from "../types/types";
import { createReim } from "../api/reimbursment-requests";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { UserProps } from "./HomePage";

import "../css/global-styling.css"

export function NewReimbursement(props: UserProps){

    const navigate = useNavigate();
    const [form, setForm] = useState<ReimbursementCreateType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:"", status:"Pending"})
    const [errMsg, setErrMsg] = useState<string>("")

    async function handleReimRequest(){
        try {
            if(form.date_of_expense === 0 || form.amount === 0 || form.expense_type === ""){
                throw new Error("Invalid input fields")
            } else {
                await createReim(form);
                navigate('/home')
            }

        } catch (error) {
            setErrMsg("Please complete all necessary fields in the form")
        }
    }

    return<>
    <Header role={props.role}  currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>
    

        {errMsg.length > 0 &&
            <p className="error-msg">{errMsg}</p>}

    <div className="main-form-cont">
        <ReimbursementForm form={form} setForm={setForm}/>
        <button className="form-submit-buttons" onClick={handleReimRequest}>Request Reimbursement</button>
    </div>
    
    </>
}
import {useEffect, useState} from "react";
import { UpdateReimbursementForm } from "../components/update-reimbursement-form";
import { ReimbursementCreateType } from "../types/types";
import {showReim, updateReim} from "../api/reimbursment-requests";
import {useNavigate, useParams} from "react-router-dom";


export function UpdateReimbursement(){

    const navigate = useNavigate();
    const params = Number(useParams().id)
    const [form, setForm] = useState<ReimbursementCreateType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:"", status:"Pending"})
    const [updatedForm, setUpdatedForm] = useState<ReimbursementCreateType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:"", status:"Pending"})
    const [renderUpdateForm, setRenderUpdateForm] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("")

    useEffect(()=>{
        (async ()=>{
            const retrievedReim = await showReim(params);
            console.log(retrievedReim)
            setForm(retrievedReim);
            setUpdatedForm(retrievedReim);
        })();
    }, [])

    async function handleUpdateRequest(){
        try {
            await updateReim(updatedForm, params);
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
        <UpdateReimbursementForm form={updatedForm} setForm={setUpdatedForm}/>
        <button className="form-submit-buttons" onClick={handleUpdateRequest}>Update Reimbursement</button>
    </div>
    
    </>
}


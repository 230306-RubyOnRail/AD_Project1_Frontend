import {useEffect, useState} from "react";
import { UpdateReimbursementForm } from "../components/update-reimbursement-form";
import { ReimbursementAdminType, ReimbursementCreateType } from "../types/types";
import {deleteReim, showReim, updateReim} from "../api/reimbursment-requests";
import {useNavigate, useParams} from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Header } from "../components/header";
import { UserProps } from "./HomePage";

import "../css/global-styling.css"
import "../css/form-styling.css"


export function UpdateReimbursement(props: UserProps){

    const navigate = useNavigate();
    const params = Number(useParams().id)
    const [form, setForm] = useState<ReimbursementCreateType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:"", status:"Pending"})
    const [updatedForm, setUpdatedForm] = useState<ReimbursementCreateType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:"", status:"Pending"})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReimbursement, setSelectedReimbursement] = useState<number | null>(null);
    const [errMsg, setErrMsg] = useState<string>("")

    useEffect(()=>{
        (async ()=>{
            const retrievedReim = await showReim(params);
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

    let clickDelete = () => {
        setSelectedReimbursement(params);
        setShowDeleteModal(true);
    }

    let confirmDelete = async () => {
        if (selectedReimbursement) {
            await deleteReim(selectedReimbursement);
        }
        setShowDeleteModal(false);
        navigate('/home')
    }

    return<>
    <Header role={props.role}  currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>
    

        {errMsg.length > 0 &&
            <p>{errMsg}</p>}

    <div className="main-form-cont">
        <UpdateReimbursementForm form={updatedForm} setForm={setUpdatedForm}/>
        <button className="form-submit-buttons" onClick={handleUpdateRequest}>Update Reimbursement</button>
        <button className="form-delete-button" onClick={()=> clickDelete()}>Delete</button>
    </div>
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="delete-alert">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this reimbursement?
                </Modal.Body>
                <Modal.Footer className="alert-buttons">
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
    </Modal>
    </>
}


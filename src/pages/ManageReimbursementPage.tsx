import { deleteReim, indexReim, updateReim, updateStatus } from "../api/reimbursment-requests";
import { ReimbursementAdminType, ReimbursementCreateType } from "../types/types";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Header} from "../components/header";
import { UserProps } from "./HomePage";

import "../css/manage-reims.css"
import "../css/global-styling.css"


export function ManageReimbursementPage(props: UserProps){

    const navigate = useNavigate();
    const [reimbursements, setReimbursements] = useState<ReimbursementAdminType[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReimbursement, setSelectedReimbursement] = useState<ReimbursementAdminType | null>(null);
    const [status, setStatus] = useState<string>("Pending")

    let clickDelete = (reimbursement: ReimbursementAdminType) => {
        setSelectedReimbursement(reimbursement);
        setShowDeleteModal(true);
    }

    let confirmDelete = async () => {
        if (selectedReimbursement) {
            await deleteReim(selectedReimbursement.id);
            let updatedReims = await indexReim();
            setReimbursements(updatedReims.data);
        }
        setShowDeleteModal(false);
    }

    useEffect(()=>{
        (async ()=>{
            let response = await indexReim();
            if (response.status === 200) {
                setReimbursements(response.data);

            } else {
                console.log('Unable to retrieve all reimbursements');
            }
        })();
    }, [])

    async function handleUpdateRequest(r: ReimbursementAdminType, reim_id:number){
        const updatedReim: ReimbursementCreateType = {
            expense_type: r.expense_type,
            date_of_expense: r.date_of_expense,
            amount: r.amount,
            additional_comments: r.additional_comments,
            status: status
        }
        await updateReim(updatedReim, reim_id)
        const updatedReims = await indexReim();
        setReimbursements(updatedReims.data)
    }

    return<>

        <Header role={props.role}  currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>

        <div>
            {reimbursements.length === 0 ? (
                <p className="no-reims">No reimbursements to display</p>
            ) : (
            reimbursements.map( r =>
                <div key={r.id} className="reim-cont">
                    <div className="user-data">
                        <p>Name: {r.name}</p>
                        <p>Email: {r.email}</p>
                    </div>
                    <div className="reim-data">
                        <p>Submitted: {r.created_at}</p>
                        <div className="main-reim-info">
                            <p>Date of Expense: {convertDate(r.date_of_expense)}</p>
                            <p>Expense type: {r.expense_type}</p>
                            <p>Amount: {r.amount}</p>
                        </div>
                        <p id="comments-label">Additional comments:</p>
                        <div className="comments">
                            <p id="comments">{r.additional_comments}</p>
                        </div>
                        <p id="current-status">Current Status: <span className={r.status === 'Pending' ? "pending-status" : r.status === 'Approved' ? "approved-status" : "denied-status"}>{r.status}</span></p>
                    </div>
                    <div className="status-update">
                        <label>Update Status: </label>
                        <select onChange={e => setStatus(e.target.value)}>
                        <option value={"Pending"}></option>
                            <option value={"Pending"}>Pending</option>
                            <option value={"Approved"}>Approved</option>
                            <option value={"Denied"} >Denied</option>
                        </select>
                    </div>
                    <div className="action-buttons">
                        <button onClick={()=>handleUpdateRequest(r, r.id)}>Save Changes</button>
                        <button onClick={()=> clickDelete(r)}>Delete</button>
                    </div>
                </div>
            ))}

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

        </div>

    </>
}

function convertDate(timeStamp: number){
    const date = new Date(timeStamp* 1000);
    const monthAbbrev = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    const formattedDate = `${monthAbbrev} ${day}, ${time}`;
    return formattedDate
}
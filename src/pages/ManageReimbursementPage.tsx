import { deleteReim, indexReim, updateReim, updateStatus } from "../api/reimbursment-requests";
import { ReimbursementAdminType, ReimbursementCreateType } from "../types/types";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Header} from "../components/header";

type UserProps = {
    role: string
}
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
            let response = await deleteReim(selectedReimbursement.id);
            if (response === 204) {
                const updatedReimbursements = reimbursements.filter(r => r.id !== selectedReimbursement.id);
                setReimbursements(updatedReimbursements);
            } else {
                console.log("Error deleting reimbursement");
            }
        }
        setShowDeleteModal(false);
    }

    useEffect(()=>{
        (async ()=>{
            let response = await indexReim();
            if (response.status === 200) {
                setReimbursements(response.data);
                console.log(response.data);
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

        <Header role={props.role}/>

        <div>
            {reimbursements.length === 0 ? (
                <p>No reimbursements to display</p>
            ) : (
            reimbursements.map( r =>
                <div key={r.id}>
                    <p>Submitted: {r.created_at}</p>
                    <p>Date of Expense: {r.date_of_expense}</p>
                    <p>Expense type: {r.expense_type}</p>
                    <p>Amount: {r.amount}</p>
                    <p>Additional comments: {r.additional_comments}</p>
                    <p>Status: {r.status}</p>
                    <div>
                        <label>Status: </label>
                        <select onChange={e => setStatus(e.target.value) }>
                        <option value={"Pending"}></option>
                            <option value={"Pending"}>Pending</option>
                            <option value={"Approved"}>Approved</option>
                            <option value={"Denied"}>Denied</option>
                        </select>
                    </div>
                    <div>
                    <button onClick={()=>handleUpdateRequest(r, r.id)}>Update Status</button>
                    <button onClick={()=> clickDelete(r)}>Delete</button>
                    </div>
                </div>
            ))}

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this reimbursement?
                </Modal.Body>
                <Modal.Footer>
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
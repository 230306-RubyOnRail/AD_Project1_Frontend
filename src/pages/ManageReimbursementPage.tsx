import { deleteReim, indexReim } from "../api/reimbursment-requests";
import { ReimbursementAdminType } from "../types/types";
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

    return<>

        <Header role={props.role}/>

        <div>
            {reimbursements.length === 0 ? (
                <p>No reimbursements to display</p>
            ) : (
                <ul>
                    {reimbursements.map((reimbursement: ReimbursementAdminType) => (
                        <li key={reimbursement.id}>
                            <p>Submitted: {reimbursement.created_at}</p>
                            <p>Last Updated: {reimbursement.updated_at}</p>
                            <p>Date of Expense: {reimbursement.date_of_expense}</p>
                            <p>Expense type: {reimbursement.expense_type}</p>
                            <p>Amount: {reimbursement.amount}</p>
                            <p>Additional comments: {reimbursement.additional_comments}</p>
                            <p>Status: {reimbursement.status}</p>
                            <button onClick={()=> navigate(`/updatereimbursement/${reimbursement.id}`)}>Update</button>
                            <button onClick={()=> clickDelete(reimbursement)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

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
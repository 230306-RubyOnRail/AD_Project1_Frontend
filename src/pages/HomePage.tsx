import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ReimbursementViewType } from "../types/types";
import { showUserReims, deleteReim } from "../api/reimbursment-requests"
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type UserProps = {
    role: string
}

export function HomePage(props: UserProps){

    const navigate = useNavigate();
    const [reimbursements, setReimbursements] = useState<ReimbursementViewType[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReimbursement, setSelectedReimbursement] = useState<ReimbursementViewType | null>(null);


    let clickDelete = (reimbursement: ReimbursementViewType) => {
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
            let response = await showUserReims();
            if (response.status === 200) {
                setReimbursements(response.data);
                console.log(response.data);
            } else {
                console.log('Unable to retrieve user reimbursements');
            }
        })();
    }, [])

    return<>

    <Header/>

    <p>Welcome to Revature's expense reimbursement app! Our user-friendly platform makes it easy for you to submit your expenses and get reimbursed quickly. 
        Submit expenses on-the-go, from anywhere at any time.</p>

        <p>The following is a list of your currently submitted reimbursements:</p>

    <div>
        {reimbursements.length === 0 ? (
            <p>No reimbursements to display</p>
        ) : (
            <ul>
                {reimbursements.map((reimbursement: ReimbursementViewType) => (
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
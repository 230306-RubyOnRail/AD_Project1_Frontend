import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ReimbursementViewType } from "../types/types";
import { showUserReims, deleteReim } from "../api/reimbursment-requests"
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../css/home.css"

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

    <Header role={props.role}/>

    <p className="intro">Welcome to Revature's expense reimbursement app! Our user-friendly platform makes it easy for you to submit your expenses and get reimbursed quickly. 
        Submit expenses on-the-go, from anywhere at any time.</p>

    <p className="text-elements">The following is a list of your current submitted reimbursements:</p>

    <div>
        {reimbursements.length === 0 ? (
            <p>No reimbursements to display</p>
        ) : (
            <div className="table-cont">
                <table className="main-table">
                    <thead className="thead">
                        <tr>
                            <th>Expense Type</th>
                            <th>Amount</th>
                            <th>Date of Expense</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {reimbursements.map(r => <>
                        <tr key={r.id}>
                            <td>{r.expense_type}</td>
                            <td>{r.amount}</td>
                            <td>{r.date_of_expense}</td>
                            <td>{r.status}</td>
                        </tr>
                        {r.status === 'Pending' && (
                            <tr className="update-row">
                                <td colSpan={4}><button className="update-button" onClick={() => navigate(`/updatereimbursement/${r.id}`)}>Update</button></td>
                            </tr>
                        )}
                        </>)}
                    </tbody>
                </table>
            </div>
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
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ReimbursementViewType } from "../types/types";
import { showUserReims, deleteReim } from "../api/reimbursment-requests"
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "../css/home.css"

export type UserProps = {
    role: string
    currentPage: string
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
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

    <Header role={props.role} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}/>

    <p className="intro">Welcome to Revature's expense reimbursement app! Our user-friendly platform makes it easy for you to submit your expenses and get reimbursed quickly. 
        Submit expenses on-the-go, from anywhere at any time.</p>

    <p className="text-elements">The following is a list of your current submitted reimbursements:</p>

    <div>
        {reimbursements.length === 0 ? (
            <p id="no-reims">No reimbursements to display</p>
        ) : (
            <div className="table-cont">
                <table className="main-table">
                    <thead className="thead">
                        <tr>
                            <th>ID</th>
                            <th>Expense Type</th>
                            <th>Amount</th>
                            <th>Date of Expense</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {reimbursements.map(r => <>
                        <tr key={r.id}>
                        {r.status === 'Pending' ? (
                            <Link to={`/updatereimbursement/${r.id}`}><td>{r.id}</td></Link>
                        ):(<td>{r.id}</td>)}
                            <td>{r.expense_type}</td>
                            <td>${r.amount}</td>
                            <td>{convertDate(r.date_of_expense)}</td>
                            <td className={r.status === 'Pending' ? "pending-status" : r.status === 'Approved' ? "approved-status" : "denied-status"}>{r.status}</td>
                        </tr>
                        {/* {r.status === 'Pending' && (
                            <tr className="update-row">
                                <td colSpan={4}><button className="update-button" onClick={() => navigate(`/updatereimbursement/${r.id}`)}>Update</button></td>
                            </tr>
                        )} */}
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

function convertDate(timeStamp: number){
    const date = new Date(timeStamp* 1000);
    const monthAbbrev = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    const formattedDate = `${monthAbbrev} ${day}, ${time}`;
    return formattedDate
}
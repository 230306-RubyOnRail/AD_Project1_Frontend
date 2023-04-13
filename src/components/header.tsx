import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar/navbar";
import { UserProps } from "../pages/HomePage";

import "../css/fixed-nav.css"

export function Header(props: UserProps){
    
    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.clear();
        navigate('/')
    }

    return<>
    <div className="nav-cont">
        <div className="logo">
            <Link to="/home"><img  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img></Link>
        </div>
        <div className="website-name">
            <h1 >Expense Reimbursement System</h1>
        </div>
    </div>
    <div className="nav-buttons">
            <button className="nav-button" onClick={()=> navigate('/newreimbursement')}>New Reimbursement</button>
        {props.role === "admin" && <>
            <button className="nav-button" onClick={()=> navigate('/manage/reimbursements')}>Manage Reimbursements</button>
            <button className="nav-button" onClick={()=> navigate('/register/admin')}>Account Management</button>
            </>}

            <button className="action-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    </>
}
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar/navbar";

export function Header(){
    
    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.clear();
        navigate('/')
    }

    return<>
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reinbursement System</h1>
        <div className="button-cont">
            <button className="nav-button" onClick={()=> navigate('/newreimbursement')}>New Reimbursement</button>
            <button className="action-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    </div>
    </>
}
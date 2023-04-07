import { useNavigate } from "react-router-dom";


export function Navbar(){

    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.clear();
        navigate('/')
    }

    return<>
    <div>
        <button onClick={()=> navigate('/newreimbursement')}>New Reimbursement</button>
        <button onClick={handleSignOut}>Sign Out</button>
    </div>
    </>
}
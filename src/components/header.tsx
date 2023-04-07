import { Navbar } from "../navbar/navbar";

export function Header(){
    return<>
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reinbursement System</h1>
        <Navbar/>
    </div>
    </>
}
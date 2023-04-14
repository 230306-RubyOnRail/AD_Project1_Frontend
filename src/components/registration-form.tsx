import { LoginRequest, UserForm } from "../types/types"

import "../css/form-styling.css"


type RegisterProps = {
    registerForm: UserForm
    setRegisterForm: React.Dispatch<React.SetStateAction<UserForm>>
}

export function RegisterForm(props: RegisterProps){

    return<>
    <div className="form-input-cont">
    <p className="form-heading">Register a New User:</p>
        <label className="form-labels">Fullname</label>
        <input className="form-inputs" type="text" onChange={e => props.setRegisterForm({...props.registerForm, name: e.target.value})}></input>
        <label className="form-labels">Email</label>
        <input className="form-inputs" type="text" onChange={e => props.setRegisterForm({...props.registerForm, email: e.target.value})}></input>
        <label className="form=-labels">Password</label>
        <input className="form-inputs" type="text" onChange={e => props.setRegisterForm({...props.registerForm, password: e.target.value})}></input>
    </div>
    </>
}
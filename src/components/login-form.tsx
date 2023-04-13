import { LoginRequest } from "../types/types"

import "../css/form-styling.css"


type LoginProps = {
    logInForm: LoginRequest
    setLogInForm: React.Dispatch<React.SetStateAction<LoginRequest>>
}

export function LoginForm(props: LoginProps){

    return<>
    <div className="form-input-cont">
        <label className="form-labels">Email</label>
        <input className="form-inputs" type="text" onChange={e => props.setLogInForm({...props.logInForm, email: e.target.value})}></input>
        <label className="form=-labels">Password</label>
        <input className="form-inputs" type="password" onChange={e => props.setLogInForm({...props.logInForm, password: e.target.value})}></input>
    </div>
    </>
}
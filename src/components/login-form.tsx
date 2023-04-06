import { LoginRequest } from "../types/types"


type LoginProps = {
    logInForm: LoginRequest
    setLogInForm: React.Dispatch<React.SetStateAction<LoginRequest>>
}

export function LoginForm(props: LoginProps){

    return<>
    <div>
        <label>Email</label>
        <input type="text" onChange={e => props.setLogInForm({...props.logInForm, email: e.target.value})}></input>
        <label>Password</label>
        <input type="text" onChange={e => props.setLogInForm({...props.logInForm, password: e.target.value})}></input>
    </div>
    </>
}
import {ReimbursementCreateType} from "../types/types"

type ReimProps = {
    form: ReimbursementCreateType
    setForm: React.Dispatch<React.SetStateAction<ReimbursementCreateType>>
}

export function ReimbursementForm(props: ReimProps){

    return<>
    <div className="form-input-cont">
        <p className="form-heading">New Reimbursement Form</p>

        <label className="form-labels">Expenditure Type:</label>
        <input className="form-inputs" type="text" placeholder="i.e. Travel, Meals, Supplies" onChange={e => props.setForm({...props.form, expense_type: e.target.value})}></input>

        <label className="form-labels">Date of Expense:</label>
        <input className="form-inputs" type="datetime-local" onChange={e => props.setForm({...props.form, date_of_expense: new Date(e.target.value).getTime()/1000})}></input>

        <label className="form-labels">Amount:</label>
        <input className="form-inputs" type="number" onChange={e => props.setForm({...props.form, amount: Number(e.target.value)})}></input>

        <label>Additional Comments:</label>
        <textarea className="form-textareas" onChange={e => props.setForm({...props.form, additional_comments: e.target.value})}></textarea>
    </div>
    </>
}
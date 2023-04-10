import {ReimbursementCreateType} from "../types/types"

type ReimProps = {
    form: ReimbursementCreateType
    setForm: React.Dispatch<React.SetStateAction<ReimbursementCreateType>>
}

export function UpdateReimbursementForm(props: ReimProps){

    return<>
    <div className="form-input-cont">
        <p className="form-heading">Update Reimbursement Form</p>

        <label className="form-labels">Expenditure Type:</label>
        <input className="form-inputs" type="text" value={props.form.expense_type} onChange={e => props.setForm({...props.form, expense_type: e.target.value})}></input>

        <label className="form-labels">Date of Expense:</label>
        <input className="form-inputs" type="datetime-local" value={new Date(props.form.date_of_expense * 1000).toISOString().substr(0, 16)} onChange={e => props.setForm({...props.form, date_of_expense: new Date(e.target.value).getTime()/1000})}></input>

        <label className="form-labels">Amount:</label>
        <input className="form-inputs" type="number" value={props.form.amount} onChange={e => props.setForm({...props.form, amount: Number(e.target.value)})}></input>

        <label>Additional Comments:</label>
        <textarea className="form-textareas" value={props.form.additional_comments} onChange={e => props.setForm({...props.form, additional_comments: e.target.value})}></textarea>
    </div>
    </>
}
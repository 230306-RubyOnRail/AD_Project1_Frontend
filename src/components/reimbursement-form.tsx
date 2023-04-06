

export function ReimbursementForm(){

    return<>
    <div>
        <label>Expenditure Type:</label>
        <input type="text" placeholder="i.e. Travel, Meals, Supplies"></input>

        <label>Date of Expense:</label>
        <input type="datetime-local"></input>

        <label>Amount:</label>
        <input type="number"></input>

        <label>Additional Comments:</label>
        <textarea></textarea>
    </div>
    </>
}

export type User = {
    user_id: number
    name: string
    email: string
    role: string // add a role field to the backend to distinguish between Admin/Employee
}

export type UserForm = {
    name: string
    email: string
    password: string
    role: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type Reimbursment = {
    id: number
    expense_type: string
    date_of_expense: number
    additional_comments: string
    status: string
    user_id: number
}

export type ReimbursmentForm = {
    expense_type: string
    date_of_expense: number
    amount: number
    additional_comments: string
}
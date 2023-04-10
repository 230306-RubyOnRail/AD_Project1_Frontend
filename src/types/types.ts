export type User = {
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

export type Reimbursement = {
    id: number
    expense_type: string
    date_of_expense: number
    additional_comments: string
    status: string
    user_id: number
}

export type ReimbursementCreateType = {
    expense_type: string
    date_of_expense: number
    amount: number
    additional_comments: string
}

export type ReimbursementViewType = {
    id: number
    expense_type: string
    date_of_expense: number
    amount: number
    additional_comments: string
    status: string
    created_at: string
    updated_at: string
}

export type ReimbursementAdminType = {
    id: number
    expense_type: string
    date_of_expense: number
    amount: number
    additional_comments: string
    status: string
    created_at: string
    updated_at: string
}
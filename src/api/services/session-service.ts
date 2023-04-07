import { appClient } from "../app-client"

export const authenticate = async (credentials: {email: string, password: string}) => {
    return await appClient.post('/auth/login', credentials)
}


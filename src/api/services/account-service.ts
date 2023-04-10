import { LoginRequest, UserForm } from "../../types/types";
import { appClient } from "../app-client";
import { authAppClient } from "../authenticated-app-client";
import { UserDetails } from "../user-requests";

// Authorizing Login
export const logInRequest = async (loginRequest: LoginRequest) => {
    try {
        const httpRequest = await appClient.post('/auth/login', JSON.stringify(loginRequest));

        if(httpRequest.status === 201){
            return httpRequest;
        } else {
            throw new Error(`HTTP status ${httpRequest.status} received during login request`);
        }

      } catch (error) {
        throw new Error("Error during login request");
      }
}

// Creating Employee Account
export const createEmployee = async (registrationForm: UserForm) => {
    return await appClient.post('/signup/employee', JSON.stringify(registrationForm));
}

// Creating Admin Account
export const createAdmin = async (registrationForm: UserForm) => {
    return await authAppClient.post('/signup/admin', JSON.stringify(registrationForm));
}
import { ReimbursementCreateType, ReimbursementViewType } from "../types/types";
import { authAppClient } from "./authenticated-app-client"
import {ReimbursementForm} from "../components/reimbursement-form";
import * as http from "http";
import {useState} from "react";
import { url } from "./app-client";

export const showUserReims = async () => {
    return await authAppClient.get(`${url}/reimbursements/showuserreims`);
}

export const showReim = async (id: number) :Promise<ReimbursementCreateType> => {
    return (await authAppClient.get(`${url}/reimbursements/${id}`)).data;
}

export async function createReim(reimbursement: ReimbursementCreateType) {
    try {
        return await authAppClient.post(`${url}/reimbursements`, JSON.stringify(reimbursement));

    } catch (error) {
        throw new Error("Error during reimbursement post request");
    }
}

export async function updateReim(reimbursement: ReimbursementCreateType, id: number) {
    try {
        return await authAppClient.put(`${url}/reimbursements/${id}`, JSON.stringify(reimbursement),);
    } catch (error) {
        throw new Error("Error during reimbursement put request");
    }
}

export async function updateStatus(status: string, id: number) {
    try {
        return await authAppClient.put(`${url}/reimbursements/${id}`, JSON.stringify(status),);
    } catch (error) {
        throw new Error("Error during reimbursement put request");
    }
}

export async function deleteReim(id: number) {
    try {
        console.log("deleteReim was called");
        const httpRequest = await authAppClient.delete(`${url}/reimbursements/${id}`);
        return httpRequest.status;
    } catch (error) {
        throw new Error("Error during reimbursement delete request");
    }
}

export const indexReim = async () => {
    return await authAppClient.get(`${url}/reimbursements`);
}
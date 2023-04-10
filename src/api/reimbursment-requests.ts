import { ReimbursementCreateType, ReimbursementViewType } from "../types/types";
import { authAppClient } from "./authenticated-app-client"
import {ReimbursementForm} from "../components/reimbursement-form";
import * as http from "http";
import {useState} from "react";

const url: string = 'http://127.0.0.1:3000';


export const showUserReims = async () => {
    return await authAppClient.get(`/reimbursements/showuserreims`);
}

export const showReim = async (id: number) :Promise<ReimbursementCreateType> => {
    return await authAppClient.get(`/reimbursements/${id}`);
}

export async function createReim(reimbursement: ReimbursementCreateType) {
    try {
        const httpRequest = await authAppClient.post(`/reimbursements`, JSON.stringify(reimbursement));

        // if(httpRequest.status === 201){
        //     // const reimInfo: ReimbursementCreateType = await authAppClient.get(`/reimbursements/show`);
        //     // return reimInfo;
        // } else {
        //     throw new Error(`HTTP status ${httpRequest.status} received during reimbursement post request`);
        // }

    } catch (error) {
        throw new Error("Error during reimbursement post request");
    }
}

export async function updateReim(reimbursement: ReimbursementCreateType, id: number) {
    try {
        return await authAppClient.put(`/reimbursements/${id}`, JSON.stringify(reimbursement),);
    } catch (error) {
        throw new Error("Error during reimbursement put request");
    }
}

export async function deleteReim(id: number) {
    try {
        console.log("deleteReim was called");
        const httpRequest = await authAppClient.delete(`/reimbursements/${id}`);
        return httpRequest.status;
    } catch (error) {
        throw new Error("Error during reimbursement delete request");
    }
}

export const indexReim = async () => {
    return await authAppClient.get(`/reimbursements/`);
}
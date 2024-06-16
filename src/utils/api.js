import axios, { AxiosRequestConfig } from 'axios';

import { useState } from 'react';
const BASE_URL = 'http://localhost:8000/api/v1/';

axios.defaults.withCredentials = true;

export const authVerify = async () => { 
    try {
        const response = await axios.get(`${BASE_URL}auth/verify-token`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const loginUser = async (email,password) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/login`, {
            email: email,
            password: password
        });
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const registerUser = async (firstName,lastName,email,password) => {

    try {
       
        const response = await axios.post(`${BASE_URL}auth/register`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        return response.data;
    }
    catch (error) {
        
        console.log(error);
    }
}


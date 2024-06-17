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
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const registerUser = async (data) => {

    try {
       
        const response = await axios.post(`${BASE_URL}auth/register`, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });
        return response;
    }
    catch (error) {
        
        console.log(error);
    }
}

export const userLogout = async() => {
    try {
        const response = await axios.post(`${BASE_URL}auth/logout`);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

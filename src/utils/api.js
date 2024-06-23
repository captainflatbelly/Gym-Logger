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

export const getWorkoutDates = async() => {
    try {
        const response = await axios.get(`${BASE_URL}workout/getWorkoutDates`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const createWorkout = async(data) => {
    try {
        console.log(data);
        const response = await axios.post(`${BASE_URL}workout/createWorkout`, {
            workoutExercises: data
        });
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchExercises = async() => {
    try {
        const response = await axios.get(`${BASE_URL}exercises/getUserExercises`);
        console.log(response.data.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchUserProfile = async() => {    
    try {
        const response = await axios.get(`${BASE_URL}user/getUser`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateUserProfile = async(data) => {
    try {
        const response = await axios.patch(`${BASE_URL}user/updateUser`, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            weight: data.weight,
            height: data.height
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchWorkouts = async() => {
    try {
        const response = await axios.get(`${BASE_URL}workout/getWorkouts/`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchWorkoutByDate = async(date) => {
    try {
        const response = await axios.get(`${BASE_URL}workout/${date}`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
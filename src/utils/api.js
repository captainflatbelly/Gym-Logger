import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
const BASE_URL = 'http://localhost:8000/api/v1/';
const deployed = 'https://gymloggerbackend.onrender.com/api/v1/';

axios.defaults.withCredentials = true;

export const authVerify = async () => { 
    try {
        const response = await axios.get(`${BASE_URL}auth/verify-token`);
        console.log(response);
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

export const fetchWorkoutById = async(id) => {
    try {
        const response = await axios.get(`${BASE_URL}workout/getWorkoutById/${id}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const modifyExerciseStatus = async(data) => {
    try{
        console.log(data)
        const response = await axios.patch(`${BASE_URL}workout/modifyExerciseStatus/${data.workoutId}/${data.exerciseId}`, {
            status: data.s
        });
        console.log("modified exercise: ", response);

        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const exerciseStatus = async(data) => {
    try {
        const response = await axios.get(`${BASE_URL}workout/getExerciseStatus/${data.workoutId}/${data.exerciseId}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function fetchFriends()
{
    try {
        const response = await axios.get(`${BASE_URL}friendships/getFriendships`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        
        console.log(error);
        return error
    }
}

export async function deleteFriend(data)
{
    try {
        console.log("data.id: ", data.id)
        const response = await axios.delete(`${BASE_URL}friendships/deleteFriendship/`, {
            data: { friendId: data.id }
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export async function sendFriendRequest(data)
{
    try {
        console.log("data.email: ", data.email)
        const response = await axios.post(`${BASE_URL}friendships/sendRequest`, {
            friendEmail: data.email
        });
        return response;
    }
    catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(`Error: ${error.response.data.error}`);
        }
        else
        {
            toast.error('Unknown error occurred');
        }
    }
}

export async function fetchIncomingRequests()
{
    try {
        const response = await axios.get(`${BASE_URL}friendships/incomingRequests`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function fetchOutgoingRequests()
{
    try {
        const response = await axios.get(`${BASE_URL}friendships/outgoingRequests`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function acceptFriendRequest(data)
{
    try {
        console.log("data.id: ", data.id)
        const response = await axios.patch(`${BASE_URL}friendships/acceptDeclineRequest`, {
            requestId: data.id,
            accept: true
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export async function declineFriendRequest(data)
{
    try {
        const response = await axios.patch(`${BASE_URL}friendships/acceptDeclineRequest`, {
            requestId: data.id,
            accept: false
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getUserId()
{
    try {
        const response = await axios.get(`${BASE_URL}user/getUserId`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
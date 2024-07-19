import axios  from "axios";

// const API = axios.create({baseURL : 'http://localhost:5000'})


export const registerRequest = (formData) => axios.post( `/user/register`,formData )

export const loginRequest = (formData) => axios.post( `/user/login`,formData)

export const getUserProfile = (userID) => axios.get( `/user/profile/${userID}`)

export const getAllUsers = (keyword) => axios.get( `/user/alluser?search=${keyword}`)

export const UpdateUserProfile = (UserId , ProfileData) => axios.post( `/user/profile/${UserId}/update` , ProfileData)

export const followUser = (id , data) => axios.put(`/user/${id}/follow`, {_id : data})

export const unfollowUser = (id , data) => axios.put(`/user/${id}/unfollow`, {_id : data})
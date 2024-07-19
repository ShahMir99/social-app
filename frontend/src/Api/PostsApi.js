import axios from "axios"
// const API = axios.create({baseURL : "http://localhost:5000"})


export const fetchPosts = (user) => axios.get(`/post/${user}`)

export const fetchsinglePost = (id) => axios.get(`/post/singlepost/${id}`)

export const createPost = (FormData) => axios.post(`/post/new` , FormData)

export const updatePost = (currentId, FormData) => axios.put(`/post/${currentId}` , FormData)

export const deletePost = (currentId) => axios.delete(`/post/${currentId}`)

export const likePost = (userId , PostId) => axios.put(`/post/${PostId}/likepost`, {userID : userId})

export const commentApi = (postID ,comment , user) => axios.put(`/post/${postID}/comment`,{comment , user })

export const deleteComment = (postID ,commentId) => axios.put(`/post/${postID}/comment/delete`, { commentId : commentId})
import express from "express"
const route = express.Router();
import {userRegister , userLogin , userProfile, unFollowUser ,followUser , updateUserProfile , getAllUsers} from "../Controllers/user.js"
import auth from "../Middleware/auth.js"

route.post('/register', userRegister)
route.post('/login',auth , userLogin)
route.get('/alluser',auth , getAllUsers)
route.get('/profile/:id',auth , userProfile)
route.put('/:id/follow',auth , followUser)
route.put('/:id/unfollow',auth , unFollowUser)
route.post('/profile/:id/update',auth , updateUserProfile)

export default route
import express from "express"
const route = express.Router()
import {singlepost , createPost , updatePost , deletePost , LikePost , comment ,getAllPost , deleteComment} from "../Controllers/Post.js";

// Get single And Multiple Post Routes 
route.get("/:id" , getAllPost )
route.get("/singlepost/:id" , singlepost)


// Create New Posts And Update Posts Delete Post
route.post("/new" , createPost)
route.put("/:id" , updatePost)
route.delete("/:id" , deletePost)

// Like Post And Comment on the Post

route.put("/:id/likepost" , LikePost)
route.put("/:id/comment" , comment)
route.put("/:id/comment/delete" , deleteComment)

export default route;
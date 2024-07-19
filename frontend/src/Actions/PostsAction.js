import * as PostApi from "../Api/PostsApi";
import {
  POST_REQUEST_START,
  POST_REQUEST_SUCCESSFULL,
  POST_REQUEST_FAIL,

  CREATE_REQUEST_START,
  CREATE_REQUEST_SUCCESSFULL,
  CREATE_REQUEST_FAIL,

  UPDATE_REQUEST_START,
  UPDATE_REQUEST_SUCCESSFULL,
  UPDATE_REQUEST_FAIL,

  DELETE_REQUEST_START,
  DELETE_REQUEST_SUCCESSFULL,
  DELETE_REQUEST_FAIL,
  
  LIKE_REQUEST_START,
  LIKE_REQUEST_SUCCESSFULL,
  LIKE_REQUEST_FAIL,

  SINGLE_POST_START,
  SINGLE_POST_SUCCESSFULL,
  SINGLE_POST_FAIL,


  COMMENT_REQUEST_SUCCESSFULL
  
} from "../constants/postConstants";

export const SinglePostAction = (id) => async (dispatch, state) => {
  dispatch({
    type: SINGLE_POST_START,
  });
  try {
    const { data } = await PostApi.fetchsinglePost(id);
    dispatch({ type: SINGLE_POST_SUCCESSFULL, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_POST_FAIL,
      payload: error.message,
    });
  }
  localStorage.setItem("posts" , JSON.stringify(state().Posts.Post))
};

export const PostAction = (userId) => async (dispatch, state) => {

  dispatch({
    type: POST_REQUEST_START,
  });
  try {
    const { data } = await PostApi.fetchPosts(userId);
    dispatch({ type: POST_REQUEST_SUCCESSFULL, payload: data });
  } catch (error) {
    dispatch({
      type: POST_REQUEST_FAIL,
      payload: error.message,
    });
  }
  localStorage.setItem("posts" , JSON.stringify(state().Posts.Post))
};

export const CreatePost = (FormData) => async (dispatch) => {
  dispatch({
    type: CREATE_REQUEST_START,
  });
  try {
    const { data } = await PostApi.createPost(FormData);
    dispatch({ type: CREATE_REQUEST_SUCCESSFULL, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_REQUEST_FAIL,
      payload: error.message,
    });
  }
};

export const UpdatePost = (currentId, FormData) => async (dispatch) => {
  dispatch({
    type: UPDATE_REQUEST_START,
  });
  try {
    const { data } = await PostApi.updatePost(currentId, FormData);
    dispatch({ type: UPDATE_REQUEST_SUCCESSFULL, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_REQUEST_FAIL,
      payload: error.message,
    });
  }
};

export const DeletePost = (currentId) => async (dispatch) => {
  dispatch({
    type: DELETE_REQUEST_START,
  });
  try {
    const { data } = await PostApi.deletePost(currentId);
    dispatch({ type: DELETE_REQUEST_SUCCESSFULL, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REQUEST_FAIL,
      payload: error.message,
    });
  }
};

export const LikePost = (userID , PostId) => async (dispatch) => {
  dispatch({
    type: LIKE_REQUEST_START,
  });
  try {
    const { data } = await PostApi.likePost(userID , PostId);
    dispatch({ type: LIKE_REQUEST_SUCCESSFULL, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_REQUEST_FAIL,
      payload: error.message,
    });
  }
};


export const submitComment = (postID ,commentval , user) => async (dispatch) => {

  try {
    const { data } = await PostApi.commentApi(postID ,commentval , user);
    dispatch({ type: COMMENT_REQUEST_SUCCESSFULL, payload: data });
  } catch (error) {
    console.log(error)
  }
};

export const DeleteComment = (postID ,commentID) => async (dispatch) => {

  try {
    await PostApi.deleteComment(postID , commentID );
    dispatch({ type: "DELETE_REQUEST_SUCCESSFULL", payload: commentID });
  } catch (error) {
    console.log(error)
  }
};


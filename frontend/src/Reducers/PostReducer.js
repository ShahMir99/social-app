import {
  POST_REQUEST_START,
  POST_REQUEST_SUCCESSFULL,
  POST_REQUEST_FAIL,
  CREATE_REQUEST_SUCCESSFULL,
  UPDATE_REQUEST_SUCCESSFULL,
  LIKE_REQUEST_SUCCESSFULL,
  DELETE_REQUEST_SUCCESSFULL,
  CREATE_REQUEST_START,
  CREATE_REQUEST_FAIL,

  SINGLE_POST_START,
  SINGLE_POST_SUCCESSFULL,
  SINGLE_POST_FAIL,

  COMMENT_REQUEST_SUCCESSFULL

} from "../constants/postConstants";

export const PostReducer = (state = { Post: [] ,Loading: false }, action) => {
  switch (action.type) {
    case POST_REQUEST_START:
      return { Post: [], Loading: true };

    case POST_REQUEST_SUCCESSFULL:
      return { ...state, Post: action.payload, Loading: false };

    case POST_REQUEST_FAIL:
      return { ...state, Loading: false };

    case CREATE_REQUEST_START:
      return { ...state, Loading: true };

    case CREATE_REQUEST_SUCCESSFULL:
      return {
        ...state,
        Post: [action.payload.result],
        Loading: false,
      };

    case CREATE_REQUEST_FAIL:
      return { ...state, error: action.payload, Loading: false };

    case LIKE_REQUEST_SUCCESSFULL:
    case UPDATE_REQUEST_SUCCESSFULL:
      const filterLikePost = state.Post.map((post) =>
        post._id === action.payload.savepost._id
          ? action.payload.savepost
          : post
      );

      return { ...state, Post: filterLikePost };

    case DELETE_REQUEST_SUCCESSFULL:
      const filteredPostAfterDeletion = state.Post.filter(
        (postID) => postID._id !== action.payload
      );

      return { ...state, Post: filteredPostAfterDeletion };

    default:
      return state;
  }
};

export const singlePost = (
  state = { Post: {}, Loading: false, error: false },
  action
) => {
  switch (action.type) {

    case SINGLE_POST_START :
    return {...state , Loading : true}

    case SINGLE_POST_SUCCESSFULL:
      return {...state , Post : action.payload , Loading : false}

    case COMMENT_REQUEST_SUCCESSFULL:
      return {...state , Post :{...state.Post , Comments : [...state.Post.Comments , action.payload]}, Loading : false}

    case "DELETE_REQUEST_SUCCESSFULL":
      return {...state , Post :{...state.Post , Comments : [...state.Post.Comments.filter((comments) => comments._id !== action.payload)]}, Loading : false}

    case SINGLE_POST_FAIL:
      return {...state , Loading : false, error : action.payload}

    default: 
    return state;
  }
};

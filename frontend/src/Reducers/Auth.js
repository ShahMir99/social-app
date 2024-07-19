import {
  REGISTER_REQUEST_START,
  REGISTER_REQUEST_SUCCESSFULL,
  REGISTER_REQUEST_FAIL,

  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESSFULL,
  LOGIN_REQUEST_FAIL,

  GET_PROFILE_START,
  GET_PROFILE_SUCCESSFULL,
  GET_PROFILE_FAIL,

  USER_UPDATE_START,
  USER_UPDATE__SUCCESSFULL,
  USER_UPDATE__FAIL

} from "../constants/userConstants";

export const authReducer = (state = { authData: null  , authLoading : false , error : false}, action) => {
  switch (action.type) {

    case REGISTER_REQUEST_START:
      return { ...state, authLoading : true };

    case REGISTER_REQUEST_SUCCESSFULL:
      return {...state, authData: action?.payload , authLoading : false};

    case REGISTER_REQUEST_FAIL:
      return {...state, error: action?.payload , authLoading : false};

      case USER_UPDATE_START : 
      return {...state , authLoading : true , error : false}
  
      case USER_UPDATE__SUCCESSFULL : 
  
      return {...state , authData : {...state.authData , user : action.payload } , authLoading : false , error : false}
  
      case USER_UPDATE__FAIL : 
      return {...state , authLoading : false , error : action.payload}

    case LOGIN_REQUEST_START:
      return { ...state, authLoading : true };

    case LOGIN_REQUEST_SUCCESSFULL:
      return {...state, authData: action?.payload , authLoading : false};

    case LOGIN_REQUEST_FAIL:
      return {...state, error: action?.payload , authLoading : false};

    case "LOGOUT":
      localStorage.setItem("authData" , null);
      return {...state, authData : null };

    default:
      return state;
  }
};


export const userProfile = (state = {Profile : {} ,ProfilePosts : [] , Loading : false , error : false} , action) => {

  switch(action.type) {
    case GET_PROFILE_START : 
    return {...state , Loading : true , error : false}

    case GET_PROFILE_SUCCESSFULL : 
    return {...state , Profile : action.payload.profile , ProfilePosts : action.payload.profilePost , Loading : false , error : false}

    case "FOLLOW_USER" : 
    return {...state , Profile : action.payload}

    case "UNFOLLOW_USER" : 
    return {...state , Profile : action.payload}

    case GET_PROFILE_FAIL : 
    return {...state , Loading : false , error : action.payload}

    default :
        return state;
  }
}

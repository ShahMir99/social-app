import * as userApi from "../Api/UserApi";
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




export const userRegister = (formData) => async (dispatch , state) => {
  dispatch({ type: REGISTER_REQUEST_START });
  try {
    const { data } = await userApi.registerRequest(formData);
    dispatch({ type: REGISTER_REQUEST_SUCCESSFULL, payload: data });
  } catch (err) {
    dispatch({ type: REGISTER_REQUEST_FAIL , payload : err.response.data});
  }

  localStorage.setItem("authData" , JSON.stringify(state().auth.authData))
};


export const userLogin = (formData) => async (dispatch , state) => {
  dispatch({ type: LOGIN_REQUEST_START });
  try {
    const { data } = await userApi.loginRequest(formData);
    dispatch({ type: LOGIN_REQUEST_SUCCESSFULL, payload: data });
  } catch (err) {
    dispatch({ type: LOGIN_REQUEST_FAIL , payload : err.response.data});
  }

  localStorage.setItem("authData" , JSON.stringify(state().auth.authData))
};

export const getProfile = (userID) => async (dispatch , state) => {
  dispatch({ type: GET_PROFILE_START });
  try {
    const { data } = await userApi.getUserProfile(userID);
    dispatch({ type: GET_PROFILE_SUCCESSFULL, payload: data });
  } catch (err) {
    dispatch({ type: GET_PROFILE_FAIL , payload : err.response.data});
  }

};


export const ProfileUpdate = (UserId , ProfileData) => async (dispatch , state) => {
  dispatch({ type: USER_UPDATE_START });
  try {
    const { data } = await userApi.UpdateUserProfile(UserId , ProfileData);
    dispatch({ type: USER_UPDATE__SUCCESSFULL, payload: data });
  } catch (err) {
    dispatch({ type: USER_UPDATE__FAIL , payload : err.response.data});
  }
  localStorage.setItem("authData" , JSON.stringify(state().auth.authData))
};


export const SearchUser = (keyword) => async (dispatch ) => {
  dispatch({ type: "USER_SEARCH_START" });
  try {
    const { data } = await userApi.getAllUsers(keyword);
    dispatch({ type: "USER_SEARCH__SUCCESSFULL" , payload: data });
  } catch (err) {
    dispatch({ type: "USER_SEARCH__FAIL" , payload : err.response.data});
  }
};


export const followUser = (id, userID)=> async(dispatch)=> {
  try{
    const {data} = await userApi.followUser(id, userID)
    dispatch({type: "FOLLOW_USER", payload: data})
  }catch(err){
    console.log(err)
  }

}

export const unfollowUser = (id, userID)=> async(dispatch)=> {
  try{
    const {data} = await userApi.unfollowUser(id, userID)
    dispatch({type: "UNFOLLOW_USER", payload : data})
  }catch(err){
    console.log(err)
  }


}
import { combineReducers } from "redux";
import {PostReducer , singlePost} from "./PostReducer"
import {authReducer , userProfile} from "./Auth"
import {searchUser} from "./SearchUser"

export const Reducers  = combineReducers({
   Posts : PostReducer,
   auth : authReducer, 
   UserProfile : userProfile,
   Search : searchUser,
   singlePost,
})
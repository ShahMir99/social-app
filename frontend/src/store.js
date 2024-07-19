import {legacy_createStore as createStore , applyMiddleware , compose} from "redux"
import thunk from "redux-thunk"
import { Reducers } from "./Reducers"


const  initialState  = {
    auth : {
        authData : JSON.parse(localStorage.getItem("authData"))
    },
    Posts : {
        Post : JSON.parse(localStorage.getItem("posts"))
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducers , initialState , composeEnhancers(applyMiddleware(thunk)))

export default store;
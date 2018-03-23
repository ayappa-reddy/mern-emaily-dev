import { combineReducers } from 'redux';
import authReducer from "./authReducer";

//whatever keys we provide to the object passed to 
//combinedReducers() are going to represent the keys
//defined in our state object
export default combineReducers({
    //the auth state is manufactured by the authReducer
    auth: authReducer
});
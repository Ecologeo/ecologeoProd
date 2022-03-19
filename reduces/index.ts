import { combineReducers } from "redux";
import auth from './authReduce';
import foro from './foroReducer';
import user from './userReduce';


export default combineReducers({
    auth,
    foro,
    user
})
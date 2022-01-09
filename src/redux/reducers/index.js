import { combineReducers } from "redux";
import feeds from './feeds';
import users from './users';

const rootReducer = combineReducers({
    feeds:feeds,
    users:users
});
export default rootReducer;
import {combineReducers} from "redux";
import genres from "./genres";
import search from "./search";

export default combineReducers({
    genres: genres,
    search: search
})

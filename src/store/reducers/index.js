import { combineReducers } from "redux";
import apiReducer from "./api";
import videosReducer from "./videos";

export default combineReducers({
  api: apiReducer,
  videos: videosReducer
});

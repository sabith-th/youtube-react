import { combineReducers } from "redux";
import apiReducer from "./api";
import channelsReducer from "./channels";
import videosReducer from "./videos";

export default combineReducers({
  api: apiReducer,
  videos: videosReducer,
  channels: channelsReducer
});

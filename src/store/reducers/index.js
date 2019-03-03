import { combineReducers } from "redux";
import apiReducer from "./api";
import channelsReducer from "./channels";
import commentsReducer from "./comments";
import searchReducer from "./search";
import videosReducer from "./videos";

export default combineReducers({
  api: apiReducer,
  videos: videosReducer,
  channels: channelsReducer,
  comments: commentsReducer,
  search: searchReducer
});

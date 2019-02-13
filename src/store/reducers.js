import { combineReducers } from "redux";
import { headerReducer } from "./TopMenu/reducers";
import { contentReduser } from "./Content/reducers";

export default combineReducers({
  topmenu: headerReducer,
  content: contentReduser
});

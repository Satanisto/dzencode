import { combineReducers } from "redux";
import { headerReducer } from "./Header/reducers";
import { contentReduser } from "./Content/reducers";

export default combineReducers({
  header: headerReducer,
  content: contentReduser
});

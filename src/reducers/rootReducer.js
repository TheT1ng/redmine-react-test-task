import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import projectsReducer from "./projectsReducer";
import issuesReducer from "./issuesReducer";

const rootReducer = () =>
  combineReducers({
    loginReducer,
    projectsReducer,
    issuesReducer
  });

export default rootReducer;

import { createStore, applyMiddleware } from "redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const store = () => {
  return createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
};

export default store;

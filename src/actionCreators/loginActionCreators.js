import { getIssues } from "../utils/RedmineAPIcall";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../constants/actionTypes";

export function loginRequest(inputData) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST, inputData });
    getIssues(inputData.name, inputData.password)
      .then(() => {
        if (inputData.isRememberChecked) {
          sessionStorage.setItem("isUserLogged", "true");
          localStorage.setItem("isRememberChecked", "true");
          localStorage.setItem("name", inputData.name);
          localStorage.setItem("password", inputData.password);
        }
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch(e => {
        dispatch({ type: LOGIN_FAILED, isFail: true });
        throw e;
      });
  };
}

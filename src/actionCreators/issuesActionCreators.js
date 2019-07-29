import {
  ISSUES_REQUEST,
  ISSUES_SUCCESS,
  ISSUES_FAILED
} from "../constants/actionTypes";
import { getIssuesPerProject } from "../utils/RedmineAPIcall";

export function issuesRequest(projectId) {
  return dispatch => {
    dispatch({ type: ISSUES_REQUEST });
    getIssuesPerProject(100, projectId)
      .then(resp => {
        return resp.json();
      })
      .then(success => {
        dispatch({ type: ISSUES_SUCCESS, issuesList: success.issues });
      })
      .catch(e => {
        dispatch({ type: ISSUES_FAILED, isFail: true });
        throw e;
      });
  };
}

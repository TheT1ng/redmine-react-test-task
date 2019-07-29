import { getProjects, trackProjectTime } from "../utils/RedmineAPIcall";

import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILED,
  PROJECT_COMMENT,
  PROJECT_TRACK_REQUEST
} from "../constants/actionTypes";

export function projectsRequest() {
  return dispatch => {
    dispatch({ type: PROJECTS_REQUEST });
    getProjects()
      .then(resp => {
        return resp.json();
      })
      .then(success => {
        dispatch({ type: PROJECTS_SUCCESS, projectsList: success.projects });
      })
      .catch(e => {
        dispatch({ type: PROJECTS_FAILED, isFail: true });
        throw e;
      });
  };
}

export function projectComment(comment) {
  return dispatch => {
    let projectComments =
      JSON.parse(localStorage.getItem("projectComments")) || []; // null exception
    projectComments = [
      ...projectComments,
      {
        projectId: comment.projectId,
        message: comment.message
      }
    ];
    localStorage.setItem("projectComments", JSON.stringify(projectComments));
    dispatch({ type: PROJECT_COMMENT, comment });
  };
}

export function projectTimeTrack(projectId, hours, comment, issueId) {
  return dispatch => {
    trackProjectTime(projectId, hours, comment, issueId)
      .then(resp => resp.json())
      .then(() => {
        dispatch({ type: PROJECT_TRACK_REQUEST });
      });
  };
}

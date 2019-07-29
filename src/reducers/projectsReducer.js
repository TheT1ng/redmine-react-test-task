import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILED,
  PROJECT_COMMENT,
  PROJECT_TRACK,
  PROJECT_TRACK_REQUEST
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  isCompleted: false,
  isFail: false,
  projectsList: [],
  projectComments: JSON.parse(localStorage.getItem("projectComments")) || [], // null exception
  trackingProjectId: null,
  trackingIssueId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false
      };
    case PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        projectsList: action.projectsList
      };
    case PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true
      };
    case PROJECT_COMMENT:
      return {
        ...state,
        projectComments: [
          ...state.projectComments,
          {
            projectId: action.comment.projectId,
            message: action.comment.message
          }
        ]
      };
    case PROJECT_TRACK:
      return {
        ...state,
        trackingProjectId: action.ids.projectId,
        trackingIssueId: action.ids.issueId
      };
    case PROJECT_TRACK_REQUEST:
      return {
        ...state,
        trackingProjectId: null,
        trackingIssueId: null
      };
    default:
      return state;
  }
};

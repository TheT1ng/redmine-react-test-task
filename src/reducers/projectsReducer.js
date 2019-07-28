import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILED,
  PROJECT_COMMENT,
  PROJECT_TRACK,
  PROJECT_TRACK_SUCCESS
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  isCompleted: false,
  isFail: false,
  projectsList: [],
  projectComments: JSON.parse(localStorage.getItem("projectComments"))
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
        isSuccess: false
      };
    case PROJECT_TRACK_SUCCESS:
      return {
        ...state,
        isSuccess: true
      };
    default:
      return state;
  }
};

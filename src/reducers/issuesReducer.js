import {
  ISSUES_REQUEST,
  ISSUES_SUCCESS,
  ISSUES_FAILED,
  ISSUES_HIDE,
  ISSUES_TRACK
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  isCompleted: false,
  isFail: false,
  issuesList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ISSUES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false
      };
    case ISSUES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        issuesList: action.issuesList
      };
    case ISSUES_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true
      };
    case ISSUES_HIDE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        issuesList: []
      };
    case ISSUES_TRACK:
      return state;
    default:
      return state;
  }
};

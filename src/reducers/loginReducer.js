import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  isCompleted: false,
  inputData: {
    name: "",
    password: "",
    isRememberChecked: false
  },
  isFail: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false,
        inputData: action.inputData
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true
      };
    default:
      return state;
  }
};

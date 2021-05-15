import { LOGIN, MUAFILM, SIGNUP, SUAINFO } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        userInfo: action.userInfo,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
        userInfo: action.userInfo,
      };
    case MUAFILM:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case SUAINFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

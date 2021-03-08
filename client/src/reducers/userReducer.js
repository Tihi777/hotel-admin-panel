import { USER_SIGNIN, USER_SIGNUP, USER_LOGOUT } from '../constants/userConstants';

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN:
    case USER_SIGNUP:
    case USER_LOGOUT:
      return state;
    default:
      return state;
  }
};

export default userReducer;

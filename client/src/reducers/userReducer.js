import { USER_SIGNIN, USER_SIGNIN_FAILED, USER_SIGNOUT } from '../constants/userConstants';

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN:
      return payload;
    case USER_SIGNOUT:
      return {};
    case USER_SIGNIN_FAILED:
      return { error: true };
    default:
      return state;
  }
};

export default userReducer;

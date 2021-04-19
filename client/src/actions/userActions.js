import * as api from '../api';
import { USER_SIGNIN, USER_SIGNOUT, USER_SIGNIN_FAILED } from '../constants/userConstants';

export const login = credits => async dispatch => {
  try {
    const { data } = await api.login(credits);

    dispatch({ type: USER_SIGNIN, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAILED });
    console.log(error.message);
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');

  dispatch({ type: USER_SIGNOUT });
};

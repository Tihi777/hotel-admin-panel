import * as api from '../api/index';

import { CREATE_GUEST, FETCH_GUESTS, DELETE_GUEST, UPDATE_GUEST } from '../constants/guestConstants';

export const getGuests = () => async dispatch => {
  try {
    const { data } = await api.fetchGuests();

    dispatch({ type: FETCH_GUESTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createGuest = guest => async dispatch => {
  try {
    const { data } = await api.createGuest(guest);

    dispatch({ type: CREATE_GUEST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateGuest = (id, updatedGuest) => async dispatch => {
  try {
    dispatch({ type: UPDATE_GUEST, payload: updatedGuest });

    await api.updateGuest(id, updatedGuest);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteGuest = id => async dispatch => {
  try {
    dispatch({ type: DELETE_GUEST, payload: id });

    await api.deleteGuest(id);
  } catch (error) {
    console.log(error.message);
  }
};

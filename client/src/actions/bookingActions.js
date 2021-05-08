import * as api from '../api/index';

import { CREATE_BOOKING, FETCH_BOOKINGS, DELETE_BOOKING, UPDATE_BOOKING } from '../constants/bookingConstants';

export const getBookings = () => async dispatch => {
  try {
    const { data } = await api.fetchBookings();

    dispatch({ type: FETCH_BOOKINGS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createBooking = booking => async dispatch => {
  try {
    const { data } = await api.createBooking(booking);

    dispatch({ type: CREATE_BOOKING, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateBooking = (id, updatedBooking) => async dispatch => {
  try {
    const { data } = await api.updateBooking(id, updatedBooking);

    dispatch({ type: UPDATE_BOOKING, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBooking = id => async dispatch => {
  try {
    dispatch({ type: DELETE_BOOKING, payload: id });

    await api.deleteBooking(id);
  } catch (error) {
    console.log(error.message);
  }
};

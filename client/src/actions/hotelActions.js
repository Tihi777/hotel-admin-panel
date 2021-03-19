import * as api from '../api/index';
import { CREATE_HOTEL, FETCH_HOTEL, UPDATE_HOTEL, DELETE_HOTEL, SET_ACTIVE_HOTEL } from '../constants/hotelConstants';

export const getHotels = () => async dispatch => {
  try {
    const { data } = await api.fetchHotels();

    dispatch({ type: FETCH_HOTEL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createHotel = hotel => async dispatch => {
  try {
    const score = Math.round((Math.random() * (5 - 1) + 1) * 2) / 2;
    const { data } = await api.createHotel({ ...hotel, score });

    dispatch({ type: CREATE_HOTEL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHotel = (id, updatedHotel) => async dispatch => {
  try {
    dispatch({ type: UPDATE_HOTEL, payload: updatedHotel });

    await api.updateHotel(id, updatedHotel);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHotel = id => async dispatch => {
  try {
    dispatch({ type: DELETE_HOTEL, payload: id });

    await api.deleteHotel(id);
  } catch (error) {
    console.log(error.message);
  }
};

export const setActiveHotel = data => ({ type: SET_ACTIVE_HOTEL, payload: data });

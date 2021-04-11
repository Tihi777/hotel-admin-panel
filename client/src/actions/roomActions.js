import * as api from '../api/index';
import { CREATE_ROOM, FETCH_ROOMS, UPDATE_ROOM, DELETE_ROOM, SET_ACTIVE_ROOM } from '../constants/roomConstants';

export const getRooms = () => async dispatch => {
  try {
    const { data } = await api.fetchRooms();

    dispatch({ type: FETCH_ROOMS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createRoom = room => async dispatch => {
  try {
    const { data } = await api.createRoom(room);

    dispatch({ type: CREATE_ROOM, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRoom = (id, updatedRoom) => async dispatch => {
  try {
    const { data } = await api.updateRoom(id, updatedRoom);

    dispatch({ type: UPDATE_ROOM, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRoom = id => async dispatch => {
  try {
    dispatch({ type: DELETE_ROOM, payload: id });

    await api.deleteRoom(id);
  } catch (error) {
    console.log(error.message);
  }
};

export const setActiveRoom = data => ({ type: SET_ACTIVE_ROOM, payload: data });

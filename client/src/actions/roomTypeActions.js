import * as api from '../api/index';

import { CREATE_ROOM_TYPE, FETCH_ROOM_TYPES, DELETE_ROOM_TYPE, UPDATE_ROOM_TYPE } from '../constants/roomTypeConstants';

export const getRoomTypes = () => async dispatch => {
  try {
    const { data } = await api.fetchRoomTypes();

    dispatch({ type: FETCH_ROOM_TYPES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createRoomType = roomType => async dispatch => {
  try {
    const { data } = await api.createRoomType(roomType);

    dispatch({ type: CREATE_ROOM_TYPE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRoomType = (id, updatedRoomType) => async dispatch => {
  try {
    dispatch({ type: UPDATE_ROOM_TYPE, payload: updatedRoomType });

    await api.updateRoomType(id, updatedRoomType);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRoomType = id => async dispatch => {
  try {
    dispatch({ type: DELETE_ROOM_TYPE, payload: id });

    await api.deleteRoomType(id);
  } catch (error) {
    console.log(error.message);
  }
};

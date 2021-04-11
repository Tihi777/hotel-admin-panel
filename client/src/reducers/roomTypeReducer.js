import { CREATE_ROOM_TYPE, FETCH_ROOM_TYPES, UPDATE_ROOM_TYPE, DELETE_ROOM_TYPE } from '../constants/roomTypeConstants';

const roomTypeReducer = (roomTypes = [], { type, payload }) => {
  switch (type) {
    case CREATE_ROOM_TYPE:
      return [...roomTypes, payload];
    case FETCH_ROOM_TYPES:
      return payload;
    case UPDATE_ROOM_TYPE:
      return roomTypes.map(employeePosition => (employeePosition._id === payload._id ? payload : employeePosition));
    case DELETE_ROOM_TYPE:
      return roomTypes.filter(employeePosition => employeePosition._id !== payload);
    default:
      return roomTypes;
  }
};

export default roomTypeReducer;

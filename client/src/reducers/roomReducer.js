import { CREATE_ROOM, FETCH_ROOMS, UPDATE_ROOM, DELETE_ROOM, SET_ACTIVE_ROOM } from '../constants/roomConstants';

const roomReducer = (rooms = { list: [], activeRoom: {} }, { type, payload }) => {
  switch (type) {
    case CREATE_ROOM:
      return { ...rooms, list: [...rooms.list, payload] };
    case FETCH_ROOMS:
      return { ...rooms, list: payload };
    case UPDATE_ROOM:
      return {
        ...rooms,
        list: rooms.list.map(room => (payload._id === room._id ? payload : room)),
      };
    case DELETE_ROOM:
      return { ...rooms, list: rooms.list.filter(room => room._id !== payload) };
    case SET_ACTIVE_ROOM:
      return { ...rooms, activeRoom: payload };
    default:
      return rooms;
  }
};

export default roomReducer;

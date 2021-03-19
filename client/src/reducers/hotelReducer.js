import { CREATE_HOTEL, FETCH_HOTEL, UPDATE_HOTEL, DELETE_HOTEL, SET_ACTIVE_HOTEL } from '../constants/hotelConstants';

const hotelReducer = (hotels = { list: [], activeHotel: {} }, { type, payload }) => {
  switch (type) {
    case CREATE_HOTEL:
      return { ...hotels, list: [...hotels.list, payload] };
    case FETCH_HOTEL:
      return { ...hotels, list: payload };
    case UPDATE_HOTEL:
      return {
        ...hotels,
        list: hotels.list.map(employeePosition => (employeePosition._id === payload._id ? payload : employeePosition)),
      };
    case DELETE_HOTEL:
      return { ...hotels, list: hotels.list.filter(employeePosition => employeePosition._id !== payload) };
    case SET_ACTIVE_HOTEL:
      return { ...hotels, activeHotel: payload };
    default:
      return hotels;
  }
};

export default hotelReducer;

import { CREATE_BOOKING, FETCH_BOOKINGS, UPDATE_BOOKING, DELETE_BOOKING } from '../constants/bookingConstants';

const bookingReducer = (bookings = [], { type, payload }) => {
  switch (type) {
    case CREATE_BOOKING:
      return [...bookings, payload];
    case FETCH_BOOKINGS:
      return payload;
    case UPDATE_BOOKING:
      return bookings.map(booking => (booking._id === payload._id ? payload : booking));
    case DELETE_BOOKING:
      return bookings.filter(booking => booking._id !== payload);
    default:
      return bookings;
  }
};

export default bookingReducer;

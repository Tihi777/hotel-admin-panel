import { CREATE_GUEST, FETCH_GUESTS, UPDATE_GUEST, DELETE_GUEST } from '../constants/guestConstants';

const guestReducer = (guests = [], { type, payload }) => {
  switch (type) {
    case CREATE_GUEST:
      return [...guests, payload];
    case FETCH_GUESTS:
      return payload;
    case UPDATE_GUEST:
      return guests.map(guest => (guest._id === payload._id ? payload : guest));
    case DELETE_GUEST:
      return guests.filter(guest => guest._id !== payload);
    default:
      return guests;
  }
};

export default guestReducer;

import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modalConstants';

const modalReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, ...payload };
    case CLOSE_MODAL:
      return { ...state, type: '' };
    default:
      return state;
  }
};

export default modalReducer;

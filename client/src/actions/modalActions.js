import { CLOSE_MODAL, OPEN_MODAL } from '../constants/modalConstants';

export const openModal = (modalType, data) => async dispatch => {
  try {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        type: modalType,
        data,
      },
    });
  } catch (error) {
    // TODO: убрать
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
};

export const closeModal = () => async dispatch => {
  try {
    dispatch({
      type: CLOSE_MODAL,
    });
  } catch (error) {
    // TODO: убрать
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
};

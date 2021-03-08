import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EDIT_POSITIONS_MODAL } from '../../../constants/modalConstants';
import EditEmployeePositions from './EditEmployeePositions/EditEmployeePositions';
import { closeModal } from '../../../actions/modalActions';

const Modal = () => {
  const { type, data } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleClosed = () => {
    dispatch(closeModal());
  };

  let modalComponent;

  switch (type) {
    case EDIT_POSITIONS_MODAL:
      modalComponent = <EditEmployeePositions onClosed={handleClosed} {...data} />;
      break;
    default:
      modalComponent = null;
  }

  return modalComponent;
};

export default Modal;

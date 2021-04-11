import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditEmployeePositions from './EditEmployeePositions/EditEmployeePositions';
import EditRoomType from './EditRoomType/EditRoomType';

import { EDIT_POSITIONS_MODAL, EDIT_ROOM_TYPE_MODAL } from '../../../constants/modalConstants';
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
    case EDIT_ROOM_TYPE_MODAL:
      modalComponent = <EditRoomType onClosed={handleClosed} {...data} />;
      break;
    default:
      modalComponent = null;
  }

  return modalComponent;
};

export default Modal;

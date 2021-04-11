import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFade, CLink, CRow, CCardFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { openModal } from '../../../actions/modalActions';
import { deleteRoomType, getRoomTypes } from '../../../actions/roomTypeActions';
import { EDIT_ROOM_TYPE_MODAL } from '../../../constants/modalConstants';

const RoomTypes = () => {
  const roomTypes = useSelector(state => state.roomTypes);
  const dispatch = useDispatch();

  const openCreateModal = () => {
    dispatch(openModal(EDIT_ROOM_TYPE_MODAL, { title: 'Создание типа номера' }));
  };

  const openEditModal = id => {
    dispatch(openModal(EDIT_ROOM_TYPE_MODAL, { title: 'Редактирование типа номера', currentId: id }));
  };

  useEffect(() => {
    dispatch(getRoomTypes());
  }, []);

  return (
    <CRow>
      <CCol md="4" sm="6" xs="12">
        <CButton onClick={openCreateModal} color="success" className="w-100 mb-4" style={{ height: '175px' }}>
          <CIcon size="2xl" name="cilMedicalCross" />
          <h6>Добавить новый тип номер</h6>
        </CButton>
      </CCol>
      {roomTypes.map(roomType => (
        <CCol md="4" sm="6" xs="12" key={roomType._id}>
          <CFade in>
            <CCard>
              <CCardHeader>
                <h5 className="d-inline">{roomType.name}</h5>
                <div className="card-header-actions">
                  <CLink className="card-header-action text-info" onClick={() => openEditModal(roomType._id)}>
                    <CIcon name="cil-pencil" />
                  </CLink>
                  <CLink
                    className="card-header-action text-danger"
                    onClick={() => dispatch(deleteRoomType(roomType._id))}
                  >
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCardBody>{roomType.description}</CCardBody>
              <CCardFooter>
                <div className="d-flex justify-content-between">
                  <div>
                    Комнат: <span className="font-weight-bold">{roomType.numberOfRooms}</span>
                  </div>
                  <div>
                    Кроватей: <span className="font-weight-bold">{roomType.numberOfBeds}</span>
                  </div>
                  <div>
                    Стоимость: <span className="font-weight-bold text-success">{roomType.cost} руб.</span>
                  </div>
                </div>
              </CCardFooter>
            </CCard>
          </CFade>
        </CCol>
      ))}
    </CRow>
  );
};

export default RoomTypes;

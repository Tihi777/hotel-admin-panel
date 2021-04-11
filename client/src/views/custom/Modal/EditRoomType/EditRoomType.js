import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTextarea,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../actions/modalActions';
import { createRoomType, updateRoomType } from '../../../../actions/roomTypeActions';

const EditRoomType = ({ title, currentId, onClosed }) => {
  const [roomType, setRoomType] = useState({
    name: '',
    description: '',
    numberOfRooms: '',
    numberOfBeds: '',
    cost: '',
  });
  const dispatch = useDispatch();

  const editingRoomType = useSelector(state =>
    currentId ? state.roomTypes.find(roomType => roomType._id === currentId) : null
  );

  const submitForm = () => {
    if (currentId) {
      dispatch(updateRoomType(currentId, roomType));
    } else {
      dispatch(createRoomType(roomType));
    }
    dispatch(closeModal());
  };

  const handleChange = event => {
    setRoomType(prevRoomType => ({ ...prevRoomType, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (editingRoomType) {
      setRoomType(editingRoomType);
    }
  }, [editingRoomType]);

  return (
    <CModal show onClose={() => {}} size="lg" onClosed={onClosed}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Название</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="text-input"
                name="name"
                placeholder="Двухместный люкс"
                value={roomType.name}
                onChange={handleChange}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">Описание</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                name="description"
                id="textarea-input"
                rows="9"
                value={roomType.description}
                onChange={handleChange}
                placeholder="Введите описание типа номера..."
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="6" md="4">
              <CLabel htmlFor="text-input">Количество комнат</CLabel>
              <CInput
                id="text-input"
                name="numberOfRooms"
                type="number"
                value={(() => (roomType.numberOfRooms < 0 ? 0 : roomType.numberOfRooms))()}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs="6" md="4">
              <CLabel htmlFor="text-input">Количество кроватей</CLabel>
              <CInput
                id="text-input"
                name="numberOfBeds"
                type="number"
                value={(() => (roomType.numberOfBeds < 0 ? 0 : roomType.numberOfBeds))()}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs="6" md="4">
              <CLabel htmlFor="text-input">Стоимость</CLabel>
              <div className="controls">
                <CInputGroup className="input-prepend">
                  <CInputGroupPrepend>
                    <CInputGroupText>Руб</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="text-input"
                    name="cost"
                    type="number"
                    value={(() => (roomType.cost < 0 ? 0 : roomType.cost))()}
                    onChange={handleChange}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText>.00</CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </div>
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={submitForm} disabled={!(roomType.name && roomType.description)}>
          {currentId ? 'Редактировать' : 'Создать'}
        </CButton>{' '}
        <CButton color="secondary" onClick={() => dispatch(closeModal())}>
          Отмена
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditRoomType;

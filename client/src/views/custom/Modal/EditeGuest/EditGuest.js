import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSelect,
} from '@coreui/react';
import { closeModal } from '../../../../actions/modalActions';
import { createGuest, updateGuest } from '../../../../actions/guestActions';

const EditGuest = ({ title, currentId, onClosed }) => {
  const [guest, setGuest] = useState({
    name: '',
    email: '',
  });
  const editingGuest = useSelector(state => (currentId ? state.guests.find(guest => guest._id === currentId) : null));

  const dispatch = useDispatch();

  const submitForm = () => {
    if (currentId) {
      dispatch(updateGuest(currentId, guest));
    } else {
      dispatch(createGuest(guest));
    }
    dispatch(closeModal());
  };

  const handleChange = event => {
    setGuest(prevGuest => ({ ...prevGuest, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (editingGuest) {
      setGuest(editingGuest);
    }
  }, [editingGuest]);

  return (
    <CModal show onClose={() => {}} size="lg" onClosed={onClosed}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol xs="1">
              <CLabel htmlFor="name">ФИО</CLabel>
            </CCol>
            <CCol xs="11">
              <CInput
                id="name"
                name="name"
                placeholder="Семенов Семен Семенович"
                value={guest.name}
                onChange={handleChange}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="1">
              <CLabel htmlFor="email">Email</CLabel>
            </CCol>
            <CCol xs="11">
              <CInput
                id="email"
                name="email"
                placeholder="semenov@gmail.com"
                value={guest.email}
                onChange={handleChange}
              />
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={submitForm} disabled={!(guest.name && guest.email)}>
          {currentId ? 'Редактировать' : 'Зарегистрировать'}
        </CButton>
        <CButton color="secondary" onClick={() => dispatch(closeModal())}>
          Отмена
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditGuest;

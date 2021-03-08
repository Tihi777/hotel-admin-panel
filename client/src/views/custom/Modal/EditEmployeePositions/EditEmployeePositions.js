import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTextarea,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../actions/modalActions';
import { createEmployeePosition, updateEmployeePosition } from '../../../../actions/employeePositionActions';

const EditEmployeePositions = ({ title, currentId, onClosed }) => {
  const [employeePosition, setEmployeePosition] = useState({ name: '', description: '' });
  const editingEmployeePosition = useSelector(state =>
    currentId ? state.employeePositions.find(employeePosition => employeePosition._id === currentId) : null
  );
  const dispatch = useDispatch();

  const submitForm = () => {
    if (currentId) {
      dispatch(updateEmployeePosition(currentId, employeePosition));
    } else {
      dispatch(createEmployeePosition(employeePosition));
    }
    dispatch(closeModal());
  };

  const handleChange = event => {
    setEmployeePosition(prevEmployeePosition => ({ ...prevEmployeePosition, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (editingEmployeePosition) {
      setEmployeePosition(editingEmployeePosition);
    }
  }, [editingEmployeePosition]);

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
                placeholder="Администратор"
                value={employeePosition.name}
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
                value={employeePosition.description}
                onChange={handleChange}
                placeholder="Описание обязаностей"
              />
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={submitForm}
          disabled={!(employeePosition.name && employeePosition.description)}
        >
          {currentId ? 'Редактировать' : 'Создать'}
        </CButton>{' '}
        <CButton color="secondary" onClick={() => dispatch(closeModal())}>
          Отмена
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditEmployeePositions;

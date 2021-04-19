import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../actions/modalActions';
import { createEmployee, updateEmployee } from '../../../../actions/employeeActions';

const EditEmployees = ({ title, currentId, onClosed }) => {
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    email: '',
    password: '',
    isAdmin: false,
    hotelName: '',
    hotelId: '',
  });
  const editingEmployee = useSelector(state =>
    currentId ? state.employees.find(employee => employee._id === currentId) : null
  );
  const hotels = useSelector(state => state.hotels.list);
  const positions = useSelector(state => state.employeePositions || []);
  const dispatch = useDispatch();

  const submitForm = () => {
    if (currentId) {
      dispatch(updateEmployee(currentId, employee));
    } else {
      dispatch(createEmployee(employee));
    }
    dispatch(closeModal());
  };

  const handleChange = event => {
    setEmployee(prevEmployee => ({ ...prevEmployee, [event.target.name]: event.target.value }));
  };

  const handleIsAdminChange = () => {
    setEmployee(prevEmployee => ({ ...prevEmployee, isAdmin: !prevEmployee.isAdmin }));
  };

  const handleHotelChange = event => {
    const hotelName = hotels.find(hotel => hotel._id === event.target.value)?.name;
    setEmployee(prevRoom => ({ ...prevRoom, hotelId: event.target.value, hotelName }));
  };

  useEffect(() => {
    if (editingEmployee) {
      setEmployee({ ...editingEmployee, position: editingEmployee.position._id });
    }
    console.log(editingEmployee);
  }, [editingEmployee]);

  return (
    <CModal show onClose={() => {}} size="lg" onClosed={onClosed}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol xs="1">
              <CLabel htmlFor="text-input">ФИО</CLabel>
            </CCol>
            <CCol xs="11">
              <CInput
                id="text-input"
                name="name"
                placeholder="Иванов Иван Иванович"
                value={employee.name}
                onChange={handleChange}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="6">
              <CLabel htmlFor="selectLg">Должность</CLabel>
              <CSelect custom name="position" id="position" value={employee.position} onChange={handleChange}>
                <option value={null}>Выберите должность</option>
                {positions.length > 0 ? (
                  positions.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option value={null}>Нет данных</option>
                )}
              </CSelect>
            </CCol>
            <CCol xs="6">
              <CLabel htmlFor="selectLg">Гостиница</CLabel>
              <CSelect custom name="hotel" id="hotel" value={employee.hotelId} onChange={handleHotelChange}>
                <option value={null}>Выберите гостиницу</option>
                {hotels.length > 0 ? (
                  hotels.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option value={null}>Нет данных</option>
                )}
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="6">
              <CLabel htmlFor="email">Email</CLabel>
              <CInput
                id="email"
                name="email"
                placeholder="ivanov@hotel.com"
                value={employee.email}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs="6">
              <CLabel htmlFor="email">Пароль</CLabel>
              <CInput id="password" name="password" value={employee.password} onChange={handleChange} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="12">
              <CFormGroup variant="custom-checkbox" inline>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="isAdmin"
                    name="isAdmin"
                    checked={employee.isAdmin}
                    onChange={handleIsAdminChange}
                  />
                  <CLabel variant="checkbox" className="form-check-label" htmlFor="isAdmin">
                    Права главного администратора
                  </CLabel>
                </CFormGroup>
              </CFormGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={submitForm}
          disabled={!(employee.name && employee.position && employee.hotelId && employee.email && employee.password)}
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

export default EditEmployees;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { closeModal } from '../../../../actions/modalActions';
import { createService, updateService } from '../../../../actions/serviceActions';

const EditService = ({ title, currentId, onClosed }) => {
  const [service, setService] = useState({
    name: '',
    cost: 0,
    description: '',
  });

  const editingService = useSelector(state =>
    currentId ? state.services.find(service => service._id === currentId) : null
  );

  const dispatch = useDispatch();

  const submitForm = () => {
    if (currentId) {
      dispatch(updateService(currentId, service));
    } else {
      dispatch(createService(service));
    }
    dispatch(closeModal());
  };

  const handleChange = event => {
    setService(prevService => ({ ...prevService, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (editingService) {
      setService(editingService);
    }
  }, [editingService]);

  return (
    <CModal show onClose={() => {}} size="lg" onClosed={onClosed}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol xs="6">
              <CLabel htmlFor="name">Название</CLabel>
              <CInput id="name" name="name" placeholder="Завтрак" value={service.name} onChange={handleChange} />
            </CCol>
            <CCol xs="6">
              <CLabel htmlFor="cost">Стоимость</CLabel>
              <div className="controls">
                <CInputGroup className="input-prepend">
                  <CInputGroupPrepend>
                    <CInputGroupText>Руб</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="cost"
                    name="cost"
                    type="number"
                    value={(() => (service.cost < 0 ? 0 : service.cost))()}
                    onChange={handleChange}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText>.00</CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </div>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12">
              <CLabel htmlFor="description">Описание услуги</CLabel>
              <CTextarea
                id="description"
                rows="3"
                placeholder="Введите описание услуги..."
                name="description"
                value={service.description}
                onChange={handleChange}
              />
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={submitForm} disabled={!(service.name && service.cost && service.description)}>
          {currentId ? 'Редактировать' : 'Создать'}
        </CButton>
        <CButton color="secondary" onClick={() => dispatch(closeModal())}>
          Отмена
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditService;

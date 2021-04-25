import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CButton, CCard, CCardBody, CCardHeader, CCardFooter, CCol, CFade, CLink, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { EDIT_SERVICE_MODAL } from '../../../constants/modalConstants';

import { openModal } from '../../../actions/modalActions';
import { deleteService, getServices } from '../../../actions/serviceActions';

const Services = () => {
  const services = useSelector(state => state.services) || [];
  const dispatch = useDispatch();

  const openCreateModal = () => {
    dispatch(openModal(EDIT_SERVICE_MODAL, { title: 'Создание услуги' }));
  };

  const openEditModal = id => {
    dispatch(openModal(EDIT_SERVICE_MODAL, { title: 'Редактирование услуги', currentId: id }));
  };

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <CRow>
      <CCol md="3" sm="6" xs="12">
        <CButton onClick={openCreateModal} color="success" className="w-100 mb-4" style={{ height: '150px' }}>
          <CIcon size="2xl" name="cilMedicalCross" />
          <h6>Добавить новую услугу</h6>
        </CButton>
      </CCol>
      {services.map(service => (
        <CCol md="3" sm="6" xs="12" key={service._id}>
          <CFade in>
            <CCard>
              <CCardHeader className="font-weight-bold">
                {service.name}
                <div className="card-header-actions">
                  <CLink className="card-header-action text-info" onClick={() => openEditModal(service._id)}>
                    <CIcon name="cil-pencil" />
                  </CLink>
                  <CLink
                    className="card-header-action text-danger"
                    onClick={() => dispatch(deleteService(service._id))}
                  >
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCardBody>{service.description}</CCardBody>
              <CCardFooter>
                Стоимость: <span className="text-success font-weight-bold">{service.cost} Руб.</span>
              </CCardFooter>
            </CCard>
          </CFade>
        </CCol>
      ))}
    </CRow>
  );
};

export default Services;

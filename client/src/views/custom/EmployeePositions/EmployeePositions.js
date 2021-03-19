import React, { useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFade, CLink, CRow } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_POSITIONS_MODAL } from '../../../constants/modalConstants';
import { openModal } from '../../../actions/modalActions';
import { deleteEmployeePosition, getEmployeePositions } from '../../../actions/employeePositionActions';

const EmployeePositions = () => {
  const positions = useSelector(state => state.employeePositions) || [];
  const dispatch = useDispatch();

  const openCreateModal = () => {
    dispatch(openModal(EDIT_POSITIONS_MODAL, { title: 'Создание должности' }));
  };

  const openEditModal = id => {
    dispatch(openModal(EDIT_POSITIONS_MODAL, { title: 'Редактирование должности', currentId: id }));
  };

  useEffect(() => {
    dispatch(getEmployeePositions());
  }, []);

  return (
    <CRow>
      <CCol md="3" sm="6" xs="12">
        <CButton onClick={openCreateModal} color="success" className="w-100 mb-4" style={{ height: '150px' }}>
          <CIcon size="2xl" name="cilMedicalCross" />
          <h6>Добавить новую должность</h6>
        </CButton>
      </CCol>
      {positions.map(position => (
        <CCol md="3" sm="6" xs="12" key={position._id}>
          <CFade in>
            <CCard>
              <CCardHeader>
                {position.name}
                <div className="card-header-actions">
                  <CLink className="card-header-action text-info" onClick={() => openEditModal(position._id)}>
                    <CIcon name="cil-pencil" />
                  </CLink>
                  <CLink
                    className="card-header-action text-danger"
                    onClick={() => dispatch(deleteEmployeePosition(position._id))}
                  >
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCardBody>{position.description}</CCardBody>
            </CCard>
          </CFade>
        </CCol>
      ))}
    </CRow>
  );
};

export default EmployeePositions;

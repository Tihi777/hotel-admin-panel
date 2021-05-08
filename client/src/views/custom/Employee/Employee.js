import React, { useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CLink, CRow } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import 'moment/locale/ru';
import Moment from 'react-moment';
import { deleteEmployee, getEmployees } from '../../../actions/employeeActions';
import { openModal } from '../../../actions/modalActions';
import { EDIT_EMPLOYEES_MODAL } from '../../../constants/modalConstants';

const Employee = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector(({ employees }) => employees);
  const employee = employees.find(employee => employee._id === match.params.id) || { position: {} };

  const handleDelete = async () => {
    await dispatch(deleteEmployee(match.params.id));
    history.replace('/employee');
  };

  const openEditModal = () => {
    dispatch(openModal(EDIT_EMPLOYEES_MODAL, { title: 'Редактирование сотрудника', currentId: match.params.id }));
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <div>Код сотрудника: {match.params.id}</div>
            <div className="d-flex">
              <CLink className="card-header-action text-info d-flex align-items-center" onClick={openEditModal}>
                <CIcon name="cil-pencil" />
              </CLink>
              <CLink className="card-header-action text-danger d-flex align-items-center" onClick={handleDelete}>
                <CIcon name="cil-x-circle" />
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Имя:</td>
                  <td>
                    <strong>{employee.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Должность:</td>
                  <td>
                    <strong>{employee.position?.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <strong>{employee.email}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Гостиница:</td>
                  <td>
                    <strong>{employee.hotelName}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Права администратора:</td>
                  <td>
                    <strong>{employee.isAdmin ? 'есть' : 'отсутствуют'}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Дата регистрации:</td>
                  <td>
                    <strong>
                      <Moment locale="ru" format="D MMM YYYY hh:mm:ss">
                        {employee.createdAt}
                      </Moment>
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Дата обновления:</td>
                  <td>
                    <strong>
                      <Moment locale="ru" format="D MMM YYYY hh:mm:ss">
                        {employee.updatedAt}
                      </Moment>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Employee;

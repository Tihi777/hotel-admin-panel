import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CLink, CPagination, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import 'moment/locale/ru';
import Moment from 'react-moment';

import usersData from '../../users/UsersData';
import { openModal } from '../../../actions/modalActions';
import { EDIT_EMPLOYEES_MODAL } from '../../../constants/modalConstants';
import { getEmployeePositions } from '../../../actions/employeePositionActions';
import { getEmployees } from '../../../actions/employeeActions';

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Pending':
      return 'warning';
    case 'Banned':
      return 'danger';
    default:
      return 'success';
  }
};

const Employees = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const employees = useSelector(({ employees }) => employees);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/employee/list?page=${newPage}`);
  };

  const openCreateModal = () => {
    dispatch(openModal(EDIT_EMPLOYEES_MODAL, { title: 'Добавление сотрудника' }));
  };

  const openEditModal = id => {
    dispatch(openModal(EDIT_EMPLOYEES_MODAL, { title: 'Редактирование сотрудника', currentId: id }));
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(getEmployees());
    dispatch(getEmployeePositions());
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            Список сотрудников
            <div className="card-header-actions">
              <CLink className="card-header-action text-success" onClick={openCreateModal}>
                <CIcon name="cil-user-follow" size="lg" />
                &ensp;Добавить сотрудника
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={employees}
              fields={[
                { key: 'name', _classes: 'font-weight-bold', label: 'Фамилия Имя Отчество' },
                { key: 'position', label: 'Должность' },
                { key: 'hotelName', label: 'Гостиница' },
                { key: 'email', label: 'Email' },
                { key: 'createdAt', label: 'Регистрация' },
                { key: 'status', label: 'Статус' },
              ]}
              hover
              striped
              noItemsView={{ noItems: 'Сотрудники не найдены', noResults: 'Сотрудники не найдены' }}
              itemsPerPage={8}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/employee/${item._id}`)}
              scopedSlots={{
                status: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status || 'Активный'}</CBadge>
                  </td>
                ),
                createdAt: item => (
                  <td>
                    <Moment fromNow locale="ru">
                      {item.createdAt}
                    </Moment>
                  </td>
                ),
                position: item => <td>{item.position.name}</td>,
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(employees.length / 8)}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Employees;

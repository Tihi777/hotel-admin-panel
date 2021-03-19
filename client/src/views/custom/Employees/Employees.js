import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination, CLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import usersData from '../../users/UsersData';

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
      return 'primary';
  }
};

const Employees = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/employee/list?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            Список сотрудников
            <div className="card-header-actions">
              <CLink className="card-header-action text-success" onClick={() => {}}>
                <CIcon name="cil-user-follow" size="lg" />
                &ensp;Добавить сотрудника
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                { key: 'name', _classes: 'font-weight-bold', label: 'Фамилия Имя Отчество' },
                { key: 'role', label: 'Должность' },
                'registered',
                'status',
              ]}
              hover
              striped
              itemsPerPage={8}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(usersData.length / 8)}
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

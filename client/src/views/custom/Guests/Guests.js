import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CRow,
  CLink,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../actions/modalActions';
import { EDIT_GUEST_MODAL } from '../../../constants/modalConstants';
import { deleteGuest, getGuests } from '../../../actions/guestActions';

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
      return 'warning';
  }
};

const Guests = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const guests = useSelector(({ guests }) => guests);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/guests/list?page=${newPage}`);
  };

  const openCreateModal = () => {
    dispatch(openModal(EDIT_GUEST_MODAL, { title: 'Регистрация посетителя' }));
  };

  const openEditModal = id => {
    dispatch(openModal(EDIT_GUEST_MODAL, { title: 'Изменение данных о посетителе', currentId: id }));
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(getGuests());
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            Список посетителей
            <div className="card-header-actions">
              <CLink className="card-header-action text-success" onClick={openCreateModal}>
                <CIcon name="cil-user-follow" size="lg" />
                &ensp;Зарегистрировать посетителя
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={guests}
              fields={[
                { key: 'name', _classes: 'font-weight-bold', label: 'Фамилия Имя Отчество' },
                { key: 'email', label: 'Email' },
                { key: 'edit', label: '' },
                { key: 'delete', label: '' },
              ]}
              hover
              striped
              noItemsView={{ noItems: 'Посетители не найдены', noResults: 'Посетители не найдены' }}
              itemsPerPage={5}
              activePage={page}
              clickableRows
              scopedSlots={{
                status: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status || 'Ожидание '}</CBadge>
                  </td>
                ),
                edit: item => (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => openEditModal(item._id)}
                    >
                      Редактировать
                    </CButton>
                  </td>
                ),
                delete: item => (
                  <td className="py-2">
                    <CButton
                      color="danger"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => dispatch(deleteGuest(item._id))}
                    >
                      Выселить
                    </CButton>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(guests.length / 5)}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Guests;

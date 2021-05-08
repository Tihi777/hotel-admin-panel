import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFade,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { EDIT_BOOKING_MODAL } from '../../../constants/modalConstants';

import { openModal } from '../../../actions/modalActions';
import { deleteBooking, getBookings } from '../../../actions/bookingActions';
import { getServices } from '../../../actions/serviceActions';

const getDaysBetweenTwoDates = (firstDate, secondDate) => {
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs((new Date(firstDate).getTime() - new Date(secondDate).getTime()) / oneDay));
};

const Bookings = () => {
  const bookings = useSelector(state => state.bookings) || [];
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const filteredBooking = bookings.filter(booking => booking?._id.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  const openCreateModal = () => {
    dispatch(openModal(EDIT_BOOKING_MODAL, { title: 'Создание брони' }));
  };

  const openEditModal = id => {
    dispatch(openModal(EDIT_BOOKING_MODAL, { title: 'Редактирование брони', currentId: id }));
  };

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getServices());
  }, []);

  return (
    <>
      <CRow className="mb-4">
        <CCol xs="9">
          <CInputGroup>
            <CInputGroupPrepend>
              <CInputGroupText className="bg-info text-white">Поиск</CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              placeholder="Введите номер брони..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </CInputGroup>
        </CCol>
        <CCol xs="3" className="d-flex justify-content-end">
          <CButton onClick={openCreateModal} color="success" className="w-100">
            <CIcon size="sm" name="cilMedicalCross" className="mr-2" />
            Добавить новую бронь
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        {filteredBooking &&
          filteredBooking.map(booking => (
            <CCol sm="6" xs="12" key={booking._id}>
              <CFade in>
                <CCard>
                  <CCardHeader className="font-weight-bold">
                    Бронь #{booking._id}
                    <div className="card-header-actions">
                      <CLink className="card-header-action text-info" onClick={() => openEditModal(booking._id)}>
                        <CIcon name="cil-pencil" />
                      </CLink>
                      <CLink
                        className="card-header-action text-danger"
                        onClick={() => dispatch(deleteBooking(booking._id))}
                      >
                        <CIcon name="cil-x-circle" />
                      </CLink>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <table>
                      <tbody>
                        <tr>
                          <td className="font-weight-bold">Посетитель: </td>
                          <td className="pl-1">{booking.guest.name}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold">Гостиница: </td>
                          <td className="pl-1">{booking.hotel.name}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold">Номер: </td>
                          <td className="pl-1">{booking.room.number}</td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold">Дата прибытия: </td>
                          <td className="pl-1">
                            {format(new Date(booking.arrivalDate), 'dd.MM.yyyy HH:mm', { timeFormat: '24hours' })}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-weight-bold">Дата выселения: </td>
                          <td className="pl-1">{format(new Date(booking.departureDate), 'dd.MM.yyyy HH:mm')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CCardBody>
                  <CCardFooter>
                    Цена за {getDaysBetweenTwoDates(booking.arrivalDate, booking.departureDate)} дней(дня):{' '}
                    <span className="text-success font-weight-bold">
                      {getDaysBetweenTwoDates(booking.arrivalDate, booking.departureDate) *
                        booking.room?.roomType?.cost}
                      Руб.
                    </span>
                  </CCardFooter>
                </CCard>
              </CFade>
            </CCol>
          ))}
      </CRow>
    </>
  );
};

export default Bookings;

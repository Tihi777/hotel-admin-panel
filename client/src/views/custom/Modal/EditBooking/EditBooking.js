import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSelect,
} from '@coreui/react';
import { closeModal } from '../../../../actions/modalActions';
import { createBooking, updateBooking } from '../../../../actions/bookingActions';

import 'react-datepicker/dist/react-datepicker.css';

const EditBooking = ({ title, currentId, onClosed }) => {
  const [booking, setBooking] = useState({
    guest: '',
    hotel: '',
    room: '',
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [pickedServices, setPickedServices] = useState([]);

  const editingBooking = useSelector(state =>
    currentId ? state.bookings.find(booking => booking._id === currentId) : null
  );

  const dispatch = useDispatch();
  const hotels = useSelector(({ hotels }) => hotels.list) || [];
  const guests = useSelector(({ guests }) => guests) || [];
  const services = useSelector(({ services }) => services) || [];

  const submitForm = () => {
    if (currentId) {
      dispatch(
        updateBooking(currentId, {
          ...booking,
          arrivalDate: startDate,
          departureDate: endDate,
          services: pickedServices,
        })
      );
    } else {
      dispatch(createBooking({ ...booking, arrivalDate: startDate, departureDate: endDate }));
    }
    dispatch(closeModal());
  };

  const handleChange = event => {
    setBooking(prevBooking => ({ ...prevBooking, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (editingBooking) {
      setBooking({ guest: editingBooking.guest._id, hotel: editingBooking.hotel._id, room: editingBooking.room._id });
      setStartDate(new Date(editingBooking.arrivalDate));
      setEndDate(new Date(editingBooking.departureDate));
      setPickedServices(editingBooking.services);
    }
  }, [editingBooking]);

  useEffect(() => {
    const hotel = hotels.find(hotel => hotel._id === booking.hotel);
    if (hotel) {
      setRooms(hotel.rooms);
    }
  }, [booking.hotel]);

  const handleDateChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleServicePick = event => {
    if (pickedServices?.includes(event.target.value)) {
      setPickedServices(prevServices => prevServices.filter(service => service !== event.target.value));
    } else {
      setPickedServices(prevServices => [...prevServices, event.target.value]);
    }
  };

  return (
    <CModal show onClose={() => {}} size="lg" onClosed={onClosed}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol xs="2">
              <CLabel htmlFor="guest">Посетитель</CLabel>
            </CCol>
            <CCol xs="10">
              <CSelect custom name="guest" id="guest" value={booking.guest} onChange={handleChange}>
                {guests.length && <option value={null}>Выберите посетителя</option>}
                {guests.length > 0 ? (
                  guests.map(({ _id, name }) => (
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
              <CLabel htmlFor="hotel">Гостиница</CLabel>
              <CSelect custom name="hotel" id="hotel" value={booking.hotel} onChange={handleChange}>
                {hotels.length && <option value={null}>Выберите гостиницу</option>}
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
            <CCol xs="6">
              <CLabel htmlFor="room">Номер</CLabel>
              <CSelect custom name="room" id="room" value={booking.room} onChange={handleChange} disabled={!rooms[0]}>
                {rooms?.length && <option value={null}>Выберите номер</option>}
                {rooms?.length > 0 ? (
                  rooms?.map(({ _id, number }) => (
                    <option key={_id} value={_id}>
                      Номер {number}
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
              <CLabel htmlFor="date" className="font-lg my-2">
                Выберите время прибывания в гостинице
              </CLabel>
              <DatePicker
                className="datepicker"
                name="date"
                id="date"
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                locale={ru}
                selectsRange
                inline
                showDisabledMonthNavigation
              />
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="date" className="font-lg my-2">
                Выберите дополнительные услуги
              </CLabel>
              {services.map(service => (
                <CFormGroup key={service._id} variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="services"
                    name="services"
                    value={service._id}
                    onChange={handleServicePick}
                    checked={pickedServices.some(srv => srv === service._id)}
                  />
                  <CLabel variant="checkbox" className="form-check-label" htmlFor="services">
                    {service.name}
                  </CLabel>
                </CFormGroup>
              ))}
            </CCol>
          </CFormGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={submitForm}
          disabled={!(booking.guest && booking.hotel && booking.room && startDate && endDate)}
        >
          {currentId ? 'Редактировать' : 'Создать'}
        </CButton>
        <CButton color="secondary" onClick={() => dispatch(closeModal())}>
          Отмена
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditBooking;

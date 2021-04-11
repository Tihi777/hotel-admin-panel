import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { createRoom, setActiveRoom, updateRoom } from '../../../actions/roomActions';
import { getRoomTypes } from '../../../actions/roomTypeActions';

const RoomEditForm = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [roomData, setRoomData] = useState({ number: '', floor: '', roomType: '', hotelName: '', hotelId: '' });

  const editingRoom = useSelector(state => state.rooms.activeRoom);
  const hotels = useSelector(state => state.hotels.list);
  const roomTypes = useSelector(state => state.roomTypes);

  const dispatch = useDispatch();

  const clearForm = () => {
    setRoomData({ number: '', floor: '', roomType: '', hotelName: '', hotelId: '' });
    dispatch(setActiveRoom(''));
  };

  const submitForm = () => {
    if (editingRoom._id) {
      dispatch(updateRoom(editingRoom._id, roomData));
    } else {
      dispatch(createRoom(roomData));
    }
    clearForm();
    setCollapsed(false);
  };

  const handleChange = event => {
    setRoomData(prevRoom => ({ ...prevRoom, [event.target.name]: event.target.value }));
  };

  const handleHotelChange = event => {
    const hotelName = hotels.find(hotel => hotel._id === event.target.value).name;
    setRoomData(prevRoom => ({ ...prevRoom, hotelId: event.target.value, hotelName }));
  };

  useEffect(() => {
    if (editingRoom._id) {
      setRoomData(editingRoom);
    }
  }, [editingRoom]);

  useEffect(() => {
    dispatch(getRoomTypes());
  }, []);

  return (
    <CRow>
      <CCol xs="12">
        <CCard style={{ borderRadius: '0 0 25px 25px' }}>
          <CCardHeader>
            {editingRoom._id ? 'Редактирование Номера' : 'Создание Номера'}
            <div className="card-header-actions">
              <CButton
                color="link"
                className="card-header-action btn-minimize"
                onClick={() => setCollapsed(!collapsed)}
              >
                <CIcon name={collapsed ? 'cil-arrow-thick-top' : 'cil-arrow-thick-bottom'} className="text-info" />
              </CButton>
            </div>
          </CCardHeader>
          <CCollapse show={collapsed} timeout={1000}>
            <CCardBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol md="6">
                    <CLabel htmlFor="prependedInput">Этаж</CLabel>
                    <CInput
                      id="floor"
                      size="lg"
                      name="floor"
                      type="number"
                      value={(() => (roomData.floor < 0 ? 0 : roomData.floor))()}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel htmlFor="prependedInput">Номер</CLabel>
                    <CInput
                      id="number"
                      size="lg"
                      type="number"
                      name="number"
                      value={(() => (roomData.number < 0 ? 0 : roomData.number))()}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12" size="lg">
                    <CLabel htmlFor="selectLg">Гостиница</CLabel>
                    <CSelect
                      custom
                      size="lg"
                      name="hotel"
                      id="hotel"
                      value={roomData.hotelId}
                      onChange={handleHotelChange}
                    >
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
                  <CCol md="12" size="lg">
                    <CLabel htmlFor="selectLg">Тип номера</CLabel>
                    <CSelect
                      custom
                      size="lg"
                      name="roomType"
                      id="roomType"
                      value={roomData.roomType}
                      onChange={handleChange}
                    >
                      <option value={null}>Выберите тип номера</option>
                      {roomTypes.length > 0 ? (
                        roomTypes.map(({ _id, name }) => (
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
                <div className="form-actions edit-form__form-actions">
                  <CButton
                    color="primary"
                    onClick={submitForm}
                    disabled={!(roomData.floor && roomData.number && roomData.roomType && roomData.hotelId)}
                  >
                    {editingRoom._id ? 'Редактировать' : 'Создать'}
                  </CButton>
                  <CButton color="secondary" className="ml-3" onClick={clearForm}>
                    Очистить
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default RoomEditForm;

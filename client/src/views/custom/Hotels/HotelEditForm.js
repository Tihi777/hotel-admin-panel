import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import FileBase from 'react-file-base64';
import { createHotel, setActiveHotel, updateHotel } from '../../../actions/hotelActions';

const HotelEditForm = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [hotelData, setHotelData] = useState({ name: '', address: '', description: '', image: '' });
  const dispatch = useDispatch();
  const editingHotel = useSelector(state => state.hotels.activeHotel);

  const clearForm = () => {
    setHotelData({ name: '', address: '', description: '', image: '' });
    dispatch(setActiveHotel(''));
  };

  const submitForm = () => {
    if (editingHotel._id) {
      dispatch(updateHotel(editingHotel._id, hotelData));
    } else {
      dispatch(createHotel(hotelData));
    }
    clearForm();
    setCollapsed(false);
  };

  const handleChange = event => {
    setHotelData(prevHotel => ({ ...prevHotel, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (editingHotel._id) {
      setHotelData(editingHotel);
    }
  }, [editingHotel]);

  return (
    <CRow>
      <CCol xs="12">
        <CCard style={{ borderRadius: '0 0 25px 25px' }}>
          <CCardHeader>
            {editingHotel._id ? 'Редактирование Гостиницы' : 'Создание Гостиницы'}
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
                    <CLabel htmlFor="prependedInput">Название</CLabel>
                    <CInput
                      id="prependedInput"
                      size="16"
                      type="text"
                      name="name"
                      value={hotelData.name}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel htmlFor="prependedInput">Адрес</CLabel>
                    <CInput
                      id="prependedInput"
                      size="16"
                      type="text"
                      name="address"
                      value={hotelData.address}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12">
                    <CLabel htmlFor="textarea-input">Описание</CLabel>
                    <CTextarea
                      id="textarea-input"
                      rows="3"
                      placeholder="Введите описание гостиницы..."
                      name="description"
                      value={hotelData.description}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CButton color={hotelData.image ? 'primary' : 'secondary'} className="edit-form__image-input w-100">
                  {hotelData.image ? 'Заменить фото гостиницы' : 'Загрузить фото гостиницы'}
                  <FileBase
                    id="abc"
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setHotelData({ ...hotelData, image: base64 })}
                  />
                </CButton>
                <div className="form-actions edit-form__form-actions">
                  <CButton
                    color="primary"
                    onClick={submitForm}
                    disabled={!(hotelData.name && hotelData.address && hotelData.description)}
                  >
                    {editingHotel._id ? 'Редактировать' : 'Создать'}
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

export default HotelEditForm;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const Login = () => (
  <div className="c-app c-default-layout flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Вход</h1>
                  <p className="text-muted">Войдите в ваш аккаунт</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Электронный адрес" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Пароль" autoComplete="current-password" />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton color="primary" className="px-4">
                        Войти
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
              <CCardBody className="text-center">
                <div>
                  <h2>Регистрация</h2>
                  <p>
                    Для регистрации необходимо попросить администратора гостиницы создать для вас аккаунт и выслать вам
                    данные для входа.
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
);

export default Login;

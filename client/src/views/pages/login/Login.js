import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import { login } from '../../../actions/userActions';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const user = useSelector(({ user }) => user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = event => {
    setLoginData(prevEmployee => ({ ...prevEmployee, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (user._id) {
      history.replace('/booking');
    }
  }, [user]);

  return (
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
                      <CInput
                        type="email"
                        placeholder="Электронный адрес"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="4">
                        <CButton
                          color="primary"
                          className="px-4"
                          disabled={!(loginData.email && loginData.password)}
                          onClick={() => dispatch(login(loginData))}
                        >
                          Войти
                        </CButton>
                      </CCol>
                      {user.error && (
                        <CCol xs="8">
                          <p className="text-danger d-flex justify-content-end">Неверный логин или пароль</p>
                        </CCol>
                      )}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Регистрация</h2>
                    <p>
                      Для регистрации необходимо попросить администратора гостиницы создать для вас аккаунт и выслать
                      вам данные для входа.
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
};

export default Login;

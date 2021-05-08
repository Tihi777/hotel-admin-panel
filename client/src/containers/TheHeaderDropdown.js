import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { logout } from '../actions/userActions';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user) || {};

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
        </div>
        <div className=" ml-2">{user.name}</div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Аккаунт</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Уведомления
          <CBadge color="info" className="mfs-auto">
            5
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Сообщения
          <CBadge color="success" className="mfs-auto">
            12
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Задачи
          <CBadge color="danger" className="mfs-auto">
            3
          </CBadge>
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Настройки</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Профиль
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Настройки
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Проекты
          <CBadge color="primary" className="mfs-auto">
            4
          </CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => dispatch(logout())}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Выйти из аккаунта
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;

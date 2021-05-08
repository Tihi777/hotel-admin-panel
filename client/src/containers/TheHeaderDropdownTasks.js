import React from 'react';
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CProgress } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const TheHeaderDropdownTasks = () => {
  const itemsCount = 3;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-list" />
        <CBadge shape="pill" color="warning">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>У вас {itemsCount} незавершенных задач</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Убраться в номере
            <span className="float-right">
              <strong>0%</strong>
            </span>
          </div>
          <CProgress size="xs" color="info" value={0} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Встретить гостей
            <span className="float-right">
              <strong>25%</strong>
            </span>
          </div>
          <CProgress size="xs" color="danger" value={25} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">
            Составить отчет
            <span className="float-right">
              <strong>75%</strong>
            </span>
          </div>
          <CProgress size="xs" color="warning" value={50} />
        </CDropdownItem>
        <CDropdownItem className="text-center border-top">
          <strong>Посмотреть все задачи</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownTasks;

import React from 'react';
import { TheContent, TheFooter, TheHeader, TheSidebar } from './index';
import Modal from '../views/custom/Modal/Modal';

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
        <Modal />
      </div>
    </div>
  );
};

export default TheLayout;

import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Бронирования',
    to: '/booking',
    icon: 'cil-book',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Посетители',
    to: '/guests',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Услуги',
    to: '/services',
    icon: 'cil-brush-alt',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Управление'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Персонал',
    route: '/employee',
    icon: 'cil-sitemap',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Сотрудники',
        to: '/employee/list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Должности',
        to: '/employee/positions',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Инвентарь',
        to: '/employee/equipment',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Комплекс',
    route: '/complex',
    icon: 'cil-building',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Гостиницы',
        to: '/complex/hotels',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Номера',
        to: '/rooms/',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Типы номеров',
        to: '/roomtypes/',
      },
    ],
  },
];

export default _nav;

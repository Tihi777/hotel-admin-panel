import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './reducers/userReducer';
import modalReducer from './reducers/modalReducer';
import employeePositionReducer from './reducers/employeePositionReducer';
import hotelReducer from './reducers/hotelReducer';
import roomTypeReducer from './reducers/roomTypeReducer';
import roomReducer from './reducers/roomReducer';
import employeeReducer from './reducers/employeeReducer';
import guestReducer from './reducers/guestReducer';
import serviceReducer from './reducers/serviceReducer';
import bookingReducer from './reducers/bookingReducer';

const initialState = {
  sidebarShow: 'responsive',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  modal: modalReducer,
  employees: employeeReducer,
  employeePositions: employeePositionReducer,
  hotels: hotelReducer,
  roomTypes: roomTypeReducer,
  rooms: roomReducer,
  guests: guestReducer,
  services: serviceReducer,
  bookings: bookingReducer,
  changeState,
});

const getUserInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

const preloadedState = { user: getUserInfoFromStorage };

export default createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));

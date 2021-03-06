import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './reducers/userReducer';
import modalReducer from './reducers/modalReducer';
import employeePositionReducer from './reducers/employeePositionReducer';

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
  employeePositions: employeePositionReducer,
  changeState,
});

const getUserInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

const preloadedState = { user: getUserInfoFromStorage };

export default createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));

import * as api from '../api/index';

import {
  CREATE_EMPLOYEE_POSITION,
  DELETE_EMPLOYEE_POSITION,
  FETCH_EMPLOYEE_POSITIONS,
  UPDATE_EMPLOYEE_POSITION,
} from '../constants/employeePositionConstants';

export const getEmployeePositions = () => async dispatch => {
  try {
    const { data } = await api.fetchEmployeePositions();

    dispatch({ type: FETCH_EMPLOYEE_POSITIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEmployeePosition = position => async dispatch => {
  try {
    const { data } = await api.createEmployeePosition(position);

    dispatch({ type: CREATE_EMPLOYEE_POSITION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEmployeePosition = (id, updatedPosition) => async dispatch => {
  try {
    dispatch({ type: UPDATE_EMPLOYEE_POSITION, payload: updatedPosition });

    await api.updateEmployeePosition(id, updatedPosition);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEmployeePosition = id => async dispatch => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_POSITION, payload: id });

    await api.deleteEmployeePosition(id);
  } catch (error) {
    console.log(error.message);
  }
};

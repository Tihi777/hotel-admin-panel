import * as api from '../api/index';

import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMPLOYEES, UPDATE_EMPLOYEE } from '../constants/employeeConstants';

export const getEmployees = () => async dispatch => {
  try {
    const { data } = await api.fetchEmployee();

    dispatch({ type: FETCH_EMPLOYEES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEmployee = employee => async dispatch => {
  try {
    const { data } = await api.createEmployee(employee);

    dispatch({ type: CREATE_EMPLOYEE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEmployee = (id, employee) => async dispatch => {
  try {
    const { data } = await api.updateEmployee(id, employee);

    dispatch({ type: UPDATE_EMPLOYEE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEmployee = id => async dispatch => {
  try {
    dispatch({ type: DELETE_EMPLOYEE, payload: id });

    await api.deleteEmployee(id);
  } catch (error) {
    console.log(error.message);
  }
};

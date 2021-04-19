import { CREATE_EMPLOYEE, FETCH_EMPLOYEES, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../constants/employeeConstants';

const employeeReducer = (employees = [], { type, payload }) => {
  switch (type) {
    case CREATE_EMPLOYEE:
      return [...employees, payload];
    case FETCH_EMPLOYEES:
      return payload;
    case UPDATE_EMPLOYEE:
      return employees.map(employee => (employee._id === payload._id ? payload : employee));
    case DELETE_EMPLOYEE:
      return employees.filter(employee => employee._id !== payload);
    default:
      return employees;
  }
};

export default employeeReducer;

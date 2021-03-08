import {
  CREATE_EMPLOYEE_POSITION,
  FETCH_EMPLOYEE_POSITIONS,
  UPDATE_EMPLOYEE_POSITION,
  DELETE_EMPLOYEE_POSITION,
} from '../constants/employeePositionConstants';

const employeePositionReducer = (employeePositions = [], { type, payload }) => {
  switch (type) {
    case CREATE_EMPLOYEE_POSITION:
      return [...employeePositions, payload];
    case FETCH_EMPLOYEE_POSITIONS:
      return payload;
    case UPDATE_EMPLOYEE_POSITION:
      return employeePositions.map(employeePosition =>
        employeePosition._id === payload._id ? payload : employeePosition
      );
    case DELETE_EMPLOYEE_POSITION:
      return employeePositions.filter(employeePosition => employeePosition._id !== payload);
    default:
      return employeePositions;
  }
};

export default employeePositionReducer;

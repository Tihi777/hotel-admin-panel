import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchEmployeePositions = () => api.get('/employee/positions');
export const createEmployeePosition = employeePosition => api.post('/employee/positions', employeePosition);
export const updateEmployeePosition = (id, updatedEmployeePosition) =>
  api.patch(`/employee/positions/${id}`, updatedEmployeePosition);
export const deleteEmployeePosition = id => api.delete(`/employee/positions/${id}`);

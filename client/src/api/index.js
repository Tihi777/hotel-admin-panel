import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = credits => api.post('/login', credits);

export const fetchEmployee = () => api.get('/employees');
export const createEmployee = employee => api.post('/employees', employee);
export const updateEmployee = (id, updatedEmployee) => api.patch(`/employees/${id}`, updatedEmployee);
export const deleteEmployee = id => api.delete(`/employees/${id}`);

export const fetchEmployeePositions = () => api.get('/employee/positions');
export const createEmployeePosition = employeePosition => api.post('/employee/positions', employeePosition);
export const updateEmployeePosition = (id, updatedEmployeePosition) =>
  api.patch(`/employee/positions/${id}`, updatedEmployeePosition);
export const deleteEmployeePosition = id => api.delete(`/employee/positions/${id}`);

export const fetchHotels = () => api.get('/hotel');
export const createHotel = hotel => api.post('/hotel', hotel);
export const updateHotel = (id, updatedHotel) => api.patch(`/hotel/${id}`, updatedHotel);
export const deleteHotel = id => api.delete(`/hotel/${id}`);

export const fetchGuests = () => api.get('/guests');
export const createGuest = guest => api.post('/guests', guest);
export const updateGuest = (id, updatedGuest) => api.patch(`/guests/${id}`, updatedGuest);
export const deleteGuest = id => api.delete(`/guests/${id}`);

export const fetchRoomTypes = () => api.get('/room/types');
export const createRoomType = roomType => api.post('/room/types', roomType);
export const updateRoomType = (id, updatedRoomType) => api.patch(`/room/types/${id}`, updatedRoomType);
export const deleteRoomType = id => api.delete(`/room/types/${id}`);

export const fetchRooms = () => api.get('/rooms');
export const createRoom = room => api.post('/rooms', room);
export const updateRoom = (id, updatedRoom) => api.patch(`/rooms/${id}`, updatedRoom);
export const deleteRoom = id => api.delete(`/rooms/${id}`);

export const fetchServices = () => api.get('/services');
export const createService = service => api.post('/services', service);
export const updateService = (id, updatedService) => api.patch(`/services/${id}`, updatedService);
export const deleteService = id => api.delete(`/services/${id}`);

export const fetchBookings = () => api.get('/booking');
export const createBooking = booking => api.post('/booking', booking);
export const updateBooking = (id, updatedBooking) => api.patch(`/booking/${id}`, updatedBooking);
export const deleteBooking = id => api.delete(`/booking/${id}`);

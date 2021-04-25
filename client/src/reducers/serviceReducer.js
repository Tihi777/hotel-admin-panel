import { CREATE_SERVICE, FETCH_SERVICES, UPDATE_SERVICE, DELETE_SERVICE } from '../constants/serviceConstants';

const serviceReducer = (services = [], { type, payload }) => {
  switch (type) {
    case CREATE_SERVICE:
      return [...services, payload];
    case FETCH_SERVICES:
      return payload;
    case UPDATE_SERVICE:
      return services.map(service => (service._id === payload._id ? payload : service));
    case DELETE_SERVICE:
      return services.filter(service => service._id !== payload);
    default:
      return services;
  }
};

export default serviceReducer;

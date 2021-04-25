import * as api from '../api/index';

import { CREATE_SERVICE, FETCH_SERVICES, DELETE_SERVICE, UPDATE_SERVICE } from '../constants/serviceConstants';

export const getServices = () => async dispatch => {
  try {
    const { data } = await api.fetchServices();

    dispatch({ type: FETCH_SERVICES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createService = service => async dispatch => {
  try {
    console.log(service);
    const { data } = await api.createService(service);

    dispatch({ type: CREATE_SERVICE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateService = (id, updatedService) => async dispatch => {
  try {
    dispatch({ type: UPDATE_SERVICE, payload: updatedService });

    await api.updateService(id, updatedService);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteService = id => async dispatch => {
  try {
    dispatch({ type: DELETE_SERVICE, payload: id });

    await api.deleteService(id);
  } catch (error) {
    console.log(error.message);
  }
};


import axios from 'axios';
import { CONSTANTS } from './../utilities/constants';

export const authAction = {
  isAuthenticated: false,
  validateUser: () => {
    return axios.get(`${CONSTANTS.baseUrl}/validate-user`)  
    .then(() => {
      authAction.isAuthenticated = true;
    })
    .catch(() => {
      authAction.isAuthenticated = false;
      return Promise.reject();
    });
  },
  login: (params) => {
    return axios.post(`${CONSTANTS.baseUrl}/login`, params)  
    .then(() => {
      authAction.isAuthenticated = true;
    })
    .catch(() => {
      authAction.isAuthenticated = false;
      return Promise.reject();
    });
  },
  logout: () => {
    return axios.post(`${CONSTANTS.baseUrl}/logout`)  
    .then(() => {
      authAction.isAuthenticated = false;
    })
    .catch(() => {
      authAction.isAuthenticated = false;
      return Promise.reject();
    });
  }
}
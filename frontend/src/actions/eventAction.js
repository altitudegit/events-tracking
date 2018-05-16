
import axios from 'axios';
import { CONSTANTS } from './../utilities/constants';

export const eventAction = {
  filterEvents: (params) => {
      const request = {
        data: params
      }
      return axios.post(`${CONSTANTS.baseUrl}/filter`, request);
  },

  getKeys: () => {
    const data = {
      data: {}
    }
    
    return axios.get(`${CONSTANTS.baseUrl}/keys`, data);
  }
};
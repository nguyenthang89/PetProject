import axios from 'axios';

export const restClient = axios.create({ 
  baseURL: process.env.REACT_APP_BACKEND_LOCATION
});
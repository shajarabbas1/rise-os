import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://rise_backend:5000',
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default axiosInstance;

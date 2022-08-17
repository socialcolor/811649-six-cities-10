import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://10.react.pages.academy/six-cities/';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
  });

  return api;
};

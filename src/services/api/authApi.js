import { api } from './http';

export const authApi = {
  login: credentials => api.post('/auth/login', credentials),
  register: payload => api.post('/auth/register', payload),
  refresh: refreshToken => api.post('/auth/refresh', { refreshToken }),
};

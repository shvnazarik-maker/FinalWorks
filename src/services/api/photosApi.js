import { api } from './http';

export const photosApi = {
  getAll: () => api.get('/photos'),
  upload: formData => api.post('/photos', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: id => api.delete(`/photos/${id}`),
};

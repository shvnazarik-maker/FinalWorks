import { api } from './http';

export const notesApi = {
  getAll: () => api.get('/notes'),
  create: payload => api.post('/notes', payload),
  update: (id, payload) => api.put(`/notes/${id}`, payload),
  remove: id => api.delete(`/notes/${id}`),
};

import { api } from './http';

export const friendsApi = {
  getAll: () => api.get('/friends'),
  add: friendId => api.post(`/friends/${friendId}`),
  remove: friendId => api.delete(`/friends/${friendId}`),
};

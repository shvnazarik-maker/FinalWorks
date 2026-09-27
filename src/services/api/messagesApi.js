import { api } from './http';

export const messagesApi = {
  getByFriend: friendId => api.get(`/messages/${friendId}`),
  send: payload => api.post('/messages', payload),
  remove: id => api.delete(`/messages/${id}`),
};

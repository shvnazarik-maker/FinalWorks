import api from '../api';

export const usersApi = {
 
  getUsers: () => api.get('/api/user'),
  getMe: () => api.get('/api/user'),

  
  updateProfile: async (payload) => {
    const response = await api.patch('/api/user/profile', payload);
    return response;
  },

  changeEmail: async (email) => {
    const response = await api.post('/api/user/changeEmail', { email });
    return response;
  },

  confirmEmailChange: async (userId, token) => {
    const response = await api.get('/api/user/confirmEmailChange', {
      params: { userId: Number(userId), token },
    });
    return response;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.patch('/api/user/changePassword', {
      oldPassword,
      newPassword,
    });
    return response;
  },

  updateAvatar: async (userId, file) => {
    const formData = new FormData();
    formData.append('userId', String(userId));
    formData.append('image', file);

    return api.patch('/api/user/avatar', formData, {
      headers: { 'Content-Type': undefined },
    });
  },

  updateRole: payload => api.patch('/api/user', payload),
  getById: id => api.get(`/users/${id}`),

  updateFirstName: (userId, firstName) =>
    api.patch('/api/user/firstName', { userId: Number(userId), firstName }),
  updateLastName: (userId, lastName) =>
    api.patch('/api/user/lastName', { userId: Number(userId), lastName }),
  updatePhone: (userId, phone) =>
    api.patch('/api/user/phone', { userId: Number(userId), phone }),
  updateCity: (userId, city) =>
    api.patch('/api/user/city', { userId: Number(userId), city }),
  updateBirthPlace: (userId, birthPlace) =>
    api.patch('/api/user/birthPlace', { userId: Number(userId), birthPlace }),
};

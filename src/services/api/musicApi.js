import api from '../api';

const normalizeTrack = (track) => ({
  id: track?.id,
  name: track?.title || 'Без назви',
  title: track?.title || '',
  author: track?.author || '',
  album: track?.album || '',
  url: track?.url || null,
});

export const musicApi = {
  async getAll() {
    const { data } = await api.get('/api/track');
    return Array.isArray(data?.payload) ? data.payload.map(normalizeTrack) : [];
  },

  async upload(file, { title, author = '', album = '' } = {}) {
    const formData = new FormData();
    formData.append('Title', title || file.name.replace(/\.[^/.]+$/, ''));
    formData.append('Author', author);
    formData.append('Album', album);
    formData.append('File', file);

    const { data } = await api.post('/api/track', formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
    return data?.payload ? normalizeTrack(data.payload) : null;
  },

  async update(id, payload) {
    const { data } = await api.put('/api/track', { id, ...payload });
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(`/api/track/${id}`);
    return data;
  },
};

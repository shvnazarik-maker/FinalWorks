import api from './api';
import { normalizeUserImage } from './api/imageUrl';

const TOKEN_KEY = 'myfriends_token';

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const saveToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = () => sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

const getApiErrorMessage = (error, fallback) => {
  const data = error?.response?.data;
  if (typeof data === 'string') return data;
  if (data?.message) return data.message;
  if (data?.title) return data.title;
  if (data?.errors) {
    const messages = Object.values(data.errors).flat().filter(Boolean);
    if (messages.length) return messages.join(' ');
  }
  return fallback;
};

export const authService = {
  async login({ email, password }) {
    try {
      const { data } = await api.post('/api/auth/login', {
        email,
        password,
      });

      const token = data?.payload;
      if (!token) {
        return { success: false, message: 'API не повернув токен авторизації.' };
      }

      saveToken(token);
      const tokenUser = decodeJwtPayload(token) || {};

      const tokenId =
        tokenUser.id ??
        tokenUser.userId ??
        tokenUser.sub ??
        tokenUser.nameid ??
        tokenUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      const tokenEmail =
        tokenUser.email ??
        tokenUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

      let serverUser = null;

      try {
        const usersResponse = await api.get('/api/user');
        const items = Array.isArray(usersResponse?.data?.payload?.items)
          ? usersResponse.data.payload.items
          : [];

        serverUser = items.find((item) =>
          (tokenId != null && String(item.id) === String(tokenId)) ||
          (tokenEmail && String(item.email).toLowerCase() === String(tokenEmail).toLowerCase()) ||
          (email && String(item.email).toLowerCase() === String(email).toLowerCase())
        ) || null;
      } catch (hydrateError) {
        console.warn('Не вдалося отримати профіль після входу:', hydrateError);
      }

      const id = serverUser?.id ?? tokenId;
      const emailValue = serverUser?.email ?? tokenEmail ?? email;
      const image = normalizeUserImage(serverUser?.image ?? tokenUser.image);

      return {
        success: true,
        token,
        user: id != null
          ? {
              id: Number(id),
              email: emailValue,
              username: serverUser?.userName ?? tokenUser.userName ?? tokenUser.username,
              userName: serverUser?.userName ?? tokenUser.userName ?? tokenUser.username,
              firstName: serverUser?.firstName ?? tokenUser.firstName,
              lastName: serverUser?.lastName ?? tokenUser.lastName,
              country: serverUser?.country,
              birthDate: serverUser?.birthDate,
              about: serverUser?.aboutMe,
              aboutMe: serverUser?.aboutMe,
              role: serverUser?.role ?? tokenUser.role,
              image,
              photo: image,
              emailConfirmed: serverUser?.emailConfirmed,
            }
          : null,
      };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, 'Не вдалося виконати вхід. Перевірте email і пароль.'),
      };
    }
  },

  async register({ firstName, lastName, email, password }) {
    try {
      
      const username = email.split('@')[0].trim();

      await api.post('/api/auth/register', {
        username,
        email,
        password,
        firstName,
        lastName,
        image: '',
      });

      
      return this.login({ email, password });
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, 'Не вдалося зареєструвати акаунт.'),
      };
    }
  },


  async getCurrentUser() {
    try {
      const { data } = await api.get('/api/user');
      const items = Array.isArray(data?.payload?.items) ? data.payload.items : [];
      const token = getToken();
      const tokenUser = token ? decodeJwtPayload(token) || {} : {};
      const tokenId =
        tokenUser.id ??
        tokenUser.userId ??
        tokenUser.sub ??
        tokenUser.nameid ??
        tokenUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const tokenEmail =
        tokenUser.email ??
        tokenUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const current = items.find((item) =>
        (tokenId != null && String(item.id) === String(tokenId)) ||
        (tokenEmail && String(item.email).toLowerCase() === String(tokenEmail).toLowerCase())
      );
      if (!current) return null;
      const image = normalizeUserImage(current.image);
      return {
        id: Number(current.id),
        email: current.email,
        username: current.userName,
        userName: current.userName,
        firstName: current.firstName,
        lastName: current.lastName,
        country: current.country,
        birthDate: current.birthDate,
        about: current.aboutMe,
        aboutMe: current.aboutMe,
        role: current.role,
        image,
        photo: image,
        emailConfirmed: current.emailConfirmed,
      };
    } catch (error) {
      console.warn('Не вдалося синхронізувати поточного користувача:', error);
      return null;
    }
  },

  logout() {
    removeToken();
  },

  isAuthenticated() {
    return Boolean(getToken());
  },

  getToken,
};

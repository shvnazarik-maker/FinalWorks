import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import data, { persistedDataActions } from './slices/dataSlice';
import ui from './slices/uiSlice';
import { storage } from '../../services/storage';

const persistData = state => {
  const { data } = state;
  [
    ['myfriends_user', data.user],
    ['myfriends_added', data.addedFriendIds],
    ['myPhotos', data.photos],
    ['myfriends_notes', data.notes],
    ['myfriends_messages', data.messages],
  ].forEach(([key, value]) => storage.write(key, value));
};

const persistenceMiddleware = () => next => action => {
  const result = next(action);
  if (persistedDataActions.has(action.type)) persistData(store.getState());
  return result;
};

export const store = configureStore({
  reducer: { auth, data, ui },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistenceMiddleware),
});

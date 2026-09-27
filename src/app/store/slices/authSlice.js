import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../../../services/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: authService.isAuthenticated() },
  reducers: {
    login(state) { state.isLoggedIn = true; },
    logout(state) { state.isLoggedIn = false; },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

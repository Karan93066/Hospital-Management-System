// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
    id: '', // No longer retrieved from localStorage, only stored in Redux state
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, role, name, email, id } = action.payload;
      state.token = token;
      state.role = role;
      state.name = name;
      state.email = email;
      state.id = id;  // Store id in Redux state only, not localStorage
      console.log(id);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    },
    logout: (state) => {
      state.token = '';
      state.role = '';
      state.name = '';
      state.email = '';
      state.id = '';  // Clear id from Redux state
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

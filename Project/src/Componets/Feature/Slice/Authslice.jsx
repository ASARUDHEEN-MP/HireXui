import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  userInfo: null,
  role: null, // Initialize role as null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.role = action.payload.role;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      localStorage.setItem('userRole', action.payload.role);
      
      
    },


    logout: (state, action) => {
      state.userInfo = null;
      state.role = null; // Set role to null when logging out
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userRole');
      Cookies.remove('AdminTokens');
      
      
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

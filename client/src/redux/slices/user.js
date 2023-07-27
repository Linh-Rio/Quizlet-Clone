import { createSlice } from '@reduxjs/toolkit';
// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...action?.payload }),
      );
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
});
export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;

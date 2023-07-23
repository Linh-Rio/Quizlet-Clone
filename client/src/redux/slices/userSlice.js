import { createSlice } from '@reduxjs/toolkit';
const initialState = { token: null };
const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken, clearToken } = userSlide.actions;
export default userSlide.reducer;

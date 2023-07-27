import { createSlice } from '@reduxjs/toolkit';
// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    birthday: '',
    avatar: null,
    token: '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...action?.payload }),
      );
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.birthday = action.payload.birthday;
      state.avatar = action.payload.avatar;
      state.token = action.payload.token;
    },
    logoutSuccess: (state, action) => {
      localStorage.clear();
      state = {
        id: null,
        email: '',
        userName: '',
        firstName: '',
        lastName: '',
        birthday: '',
        avatar: null,
        token: '',
      };
    },
  },
});
export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;

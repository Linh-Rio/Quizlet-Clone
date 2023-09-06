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
      const {
        id,
        email,
        userName,
        firstName,
        lastName,
        birthday,
        avatar,
        token,
      } = action.payload;
      state.id = id;
      state.email = email;
      state.userName = userName;
      state.firstName = firstName;
      state.lastName = lastName;
      state.birthday = birthday;
      state.avatar = avatar;
      state.token = token;
    },
    logoutSuccess: (state, action) => {
      localStorage.clear();
      state.id = null;
      state.email = '';
      state.userName = '';
      state.firstName = '';
      state.lastName = '';
      state.birthday = '';
      state.avatar = null;
      state.token = '';
    },
  },
});
export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;

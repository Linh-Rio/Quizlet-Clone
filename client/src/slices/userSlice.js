import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const { increment, decrement, incrementByAmount } =
  createSlice.actions;

export default createSlice.reducer;

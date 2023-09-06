import { createSlice } from '@reduxjs/toolkit';
// Slice
const testSlice = createSlice({
  name: 'test',
  initialState: { setting: {}, questionList: [], userAnswer: [] },
  reducers: {
    testSetting: (state, action) => {
      state.setting = action.payload;
    },
    getQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    getUserAnswer: (state, action) => {
      state.userAnswer = action.payload;
    },
  },
});
export const { testSetting, getQuestionList, getUserAnswer } =
  testSlice.actions;
export default testSlice.reducer;

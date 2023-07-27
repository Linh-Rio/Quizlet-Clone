import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleGetSet } from '../../services/studySetService';

export const getStudySet = createAsyncThunk(
  'studySet/getStudySet',
  async () => {
    const response = await handleGetSet();
    return response.vocabSets;
  },
);

const studySetSlice = createSlice({
  name: 'studySet',
  initialState: {
    listSets: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudySet.fulfilled, (state, action) => {
      state.listSets = action.payload;
    });
  },
});
// export const {  } = studySetSlice.actions;
export default studySetSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  handleGetSet,
  handleCreateSet,
} from '../../services/studySetService';

export const getStudySet = createAsyncThunk(
  'studySet/getStudySet',
  async () => {
    try {
      const response = await handleGetSet();
      return response.vocabSets;
    } catch (error) {
      console.log(error);
    }
  },
);

export const createStudySet = createAsyncThunk(
  'studySet/createStudySet',
  async ({ studySet, terms }) => {
    try {
      const response = await handleCreateSet(studySet, terms);
      return response.vocabset;
    } catch (error) {
      console.log(error);
    }
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
    builder.addCase(createStudySet.fulfilled, (state, action) => {
      //   state.listSets.unshift(action.payload);
      // });
      const newStudySet = action.payload;
      const existingIndex = state.listSets.findIndex(
        (studySet) => studySet.id === newStudySet.id, // Assuming the study set has an 'id' field as a unique identifier
      );
      if (existingIndex === -1) {
        state.listSets.unshift(newStudySet);
      } else {
        // If the study set already exists, update it instead of adding it again
        state.listSets[existingIndex] = newStudySet;
      }
    });
  },
});
// export const {  } = studySetSlice.actions;
export default studySetSlice.reducer;

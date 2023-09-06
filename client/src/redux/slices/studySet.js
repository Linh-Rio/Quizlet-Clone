import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  handleGetSet,
  handleCreateSet,
  handleDeleteSet,
  handleGetSetDetail,
} from '../../services/studySetService';
// import { useNavigate } from 'react-router-dom';

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

export const deleteStudySet = createAsyncThunk(
  'studySet/deleteStudySet',
  async ({ id }) => {
    try {
      const response = await handleDeleteSet(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getSetDetail = createAsyncThunk(
  'studySet/getSetDetail',
  async (id) => {
    // const navigate = useNavigate();
    try {
      const response = await handleGetSetDetail(id);

      return response.studySet;
    } catch (error) {
      console.log(error);
    }
  },
);

const studySetSlice = createSlice({
  name: 'studySet',
  initialState: {
    listSets: [],
    setDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudySet.fulfilled, (state, action) => {
      state.listSets = action.payload;
    });
    builder.addCase(createStudySet.fulfilled, (state, action) => {
      //   state.listSets.unshift(action.payload);
      // });
      console.log(action.payload);
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
    builder.addCase(deleteStudySet.fulfilled, (state, action) => {
      const idForDelete = action.meta.arg.id;
      return {
        ...state,
        listSets: state.listSets.filter(
          (studySet) => studySet.id !== idForDelete,
        ),
      };
    });
    builder.addCase(getSetDetail.fulfilled, (state, action) => {
      return {
        ...state,
        setDetail: action.payload,
      };
    });
  },
});
// export const {  } = studySetSlice.actions;
export default studySetSlice.reducer;

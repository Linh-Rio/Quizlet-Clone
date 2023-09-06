import user from '../slices/user';
import studySet from '../slices/studySet';
import test from '../slices/test';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user,
  studySet,
  test,
});

export default rootReducer;

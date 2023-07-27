import user from '../slices/user';
import studySet from '../slices/studySet';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user,
  studySet,
});

export default rootReducer;

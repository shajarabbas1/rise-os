import { combineReducers } from 'redux';
// import { userReducer } from './user.reducer';
import { userReducer } from '../slices/user.slice';

export const rootReducer = combineReducers({
  user: userReducer,
});

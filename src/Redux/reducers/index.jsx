import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import timer from './timer';

const rootReducer = combineReducers({
  player: user,
  token,
  timer,
});

export default rootReducer;

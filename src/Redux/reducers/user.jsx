import { USER_LOGIN, USER_SCORE, USER_CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  email: '',
  userName: '',
  score: 0,
  image: '',
  assertions: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state, ...action.payload,
    };
  case USER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case USER_CORRECT_ANSWER:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default user;

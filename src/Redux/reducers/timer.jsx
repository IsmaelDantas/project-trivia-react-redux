import { TIMER_COUNT } from '../actions';

const INITIAL_STATE = {
  secondsAmount: '',
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_COUNT:
    return {
      secondsAmount: action.payload,
    };
  default:
    return state;
  }
};

export default timer;

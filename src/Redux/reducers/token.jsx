import { TOKEN_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_LOGIN:
    return { token: action.payload };
  default:
    return state;
  }
};

export default token;

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SCORE = 'USER_SCORE';
export const USER_CORRECT_ANSWER = 'USER_CORRECT_ANSWER';
export const TOKEN_LOGIN = 'TOKEN_LOGIN';
export const TIMER_COUNT = 'TIMER_COUNT';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const userScore = (payload) => ({
  type: USER_SCORE,
  payload,
});

export const userCorrectAnswer = (payload) => ({
  type: USER_CORRECT_ANSWER,
  payload,
});

export const tokenLogin = (payload) => ({
  type: TOKEN_LOGIN,
  payload,
});

export const fetchTriviaToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
    return dispatch(tokenLogin(result.token));
  } catch (error) {
    console.log(error);
  }
};

export const timerQuestion = (payload) => ({
  type: TIMER_COUNT,
  payload,
});

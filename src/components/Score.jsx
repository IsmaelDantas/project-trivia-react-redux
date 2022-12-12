import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userScore } from '../Redux/actions';

class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      scores: 0,
    };
  }

  componentDidMount() {
    const { score } = this.props;
    this.setState({ scores: score });
  }

  shouldComponentUpdate(nextProps) {
    const { secondsAmount } = this.props;
    return nextProps.secondsAmount === secondsAmount;
  }

  componentDidUpdate(prevProps) {
    const { correctAnswer, answerValue } = this.props;
    if (answerValue !== prevProps.answerValue && correctAnswer === answerValue) {
      this.handleScore();
    }
  }

  handleScore = () => {
    const { secondsAmount } = this.props;
    const magicNumber10 = 10;
    const difficultyValue = this.handleDifficulty();
    this.setState((prevState) => ({
      scores: prevState.scores + magicNumber10 + (secondsAmount * difficultyValue),
    }));
    setTimeout(() => this.handleUserScore(), 1);
  }

  handleUserScore = () => {
    const { userScores } = this.props;
    const { scores } = this.state;
    userScores(scores);
  }

  handleDifficulty = () => {
    const { difficulty } = this.props;
    const magicNumber3 = 3;
    if (difficulty === 'easy') return 1;
    if (difficulty === 'medium') return 2;
    if (difficulty === 'hard') return magicNumber3;
  }

  render() {
    const { scores } = this.state;
    return (
      <h5>{ scores }</h5>
    );
  }
}

const mapStateToProps = (state) => ({
  secondsAmount: state.timer.secondsAmount,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  userScores: (state) => dispatch(userScore(state)),
});

Score.propTypes = {
  correctAnswer: PropTypes.string,
  answerValue: PropTypes.string,
  secondsAmount: PropTypes.number,
  difficulty: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Score);

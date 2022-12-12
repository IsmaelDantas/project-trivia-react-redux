import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { userScore } from '../Redux/actions';

const MIN_ASSERTIONS_NUMBER = 3;

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
  }

  componentDidMount() {
    const { userName, score, image } = this.props;
    const playerInf = JSON.parse(localStorage.getItem('ranking'));
    const newPlayer = { userName, score, image };
    if (playerInf) {
      const newRanking = { ...playerInf, [Object.keys(playerInf).length]: newPlayer };
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      const newRanking = {
        0: newPlayer,
      };
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  btnPlayAgain = () => {
    const { history, userScores } = this.props;
    const { score } = this.state;
    userScores(score);
    history.push('/');
  }

  btnRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <p
          data-testid="feedback-text"
        >
          { assertions < MIN_ASSERTIONS_NUMBER ? 'Could be better...' : 'Well Done!' }
        </p>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">{ ` ${assertions} ` }</span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">{ ` ${score} ` }</span>
          pontos
        </p>
        <button
          data-testid="btn-play-again"
          onClick={ this.btnPlayAgain }
          type="button"
        >
          Play Again

        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.btnRanking }
          type="button"
        >
          Ranking
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  userScores: (state) => dispatch(userScore(state)),
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  userName: state.player.userName,
  score: state.player.score,
  image: state.player.image,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  userName: PropTypes.string,
  score: PropTypes.number,
  image: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

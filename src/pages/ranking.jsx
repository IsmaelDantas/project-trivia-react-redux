import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userScore } from '../Redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
      score: 0,
    };
  }

  componentDidMount() {
    const { ranking } = this.state;
    const playerInf = JSON.parse(localStorage.getItem('ranking'));
    const objectValues = Object.values(playerInf).sort((a, b) => (b.score - a.score));
    this.setState({
      ranking: objectValues || ranking,
    });
  }

  btnLoginAgain = () => {
    const { history, userScores } = this.props;
    const { score } = this.state;
    userScores(score);
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img
                src={ player.image }
                alt={ `Imagem do ${player.userName}` }
              />
              -
              <span data-testid={ `player-name-${index}` }>
                {player.userName}
              </span>
              -
              <span data-testid={ `player-score-${index}` }>
                {player.score}
              </span>
            </li>
          ))}
        </ul>
        <button
          data-testid="btn-go-home"
          onClick={ this.btnLoginAgain }
          type="button"
        >
          Play Again
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  userScores: (state) => dispatch(userScore(state)),
});

Ranking.propTypes = {
  playerName: PropTypes.string,
  playerScore: PropTypes.number,
  playerImage: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  playerName: state.player.userName,
  playerScore: state.player.score,
  playerImage: state.player.image,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

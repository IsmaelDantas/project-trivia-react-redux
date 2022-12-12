import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Score from './Score';
import { userCorrectAnswer } from '../Redux/actions';

class Trivia extends Component {
  state = {
    answer: {},
    wrongAnswer: {},
    disabled: false,
    answerValue: '',
    correctAnswerNumber: 0,
  };

  componentDidMount() {
    const magicNumber30000 = 30000;
    setTimeout(() => this.handleClickAnswer(), magicNumber30000);

    const { assertions } = this.props;
    this.setState({ correctAnswerNumber: assertions });
  }

  handleClickAnswer = () => {
    const { buttonValidation } = this.props;
    buttonValidation();

    this.setState({
      answer: { border: '3px solid rgb(6, 240, 15)' },
      wrongAnswer: { border: '3px solid red' },
      disabled: true,
    });
  };

  handleClickScore = ({ target }) => {
    const { value } = target;
    const { correct_answer: correctAnswer } = this.props;

    this.setState({ answerValue: value });
    this.handleClickAnswer();

    if (correctAnswer === value) {
      this.setState((prevState) => ({
        correctAnswerNumber: prevState.correctAnswerNumber + 1,
      }));
      setTimeout(() => this.handleCorrectAnswer(), 1);
    }
  }

  handleCorrectAnswer = () => {
    const { numberCorrect } = this.props;
    const { correctAnswerNumber } = this.state;
    numberCorrect(correctAnswerNumber);
  }

  render() {
    const magicNumber1 = 0.5;
    const magicNumber2 = -1;
    const { answer, wrongAnswer, disabled, answerValue } = this.state;

    const { category, question, difficulty,
      incorrect_answers: incorrectAnswer, correct_answer: correctAnswer } = this.props;
    console.log(correctAnswer);
    const options = [...incorrectAnswer, correctAnswer];
    return (
      <div>
        <Score
          difficulty={ difficulty }
          correctAnswer={ correctAnswer }
          answerValue={ answerValue }
        />
        <Timer disabled={ disabled } />
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {options.map((item, index) => (
            <button
              data-testid={ item === correctAnswer
                ? 'correct-answer' : `wrong-answer-${index}` }
              style={ item === correctAnswer
                ? answer : wrongAnswer }
              type="button"
              disabled={ disabled }
              key={ index }
              value={ item }
              onClick={ this.handleClickScore }
            >
              { item }

            </button>
          )).sort(() => ((Math.random() > magicNumber1) ? 1 : magicNumber2))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  numberCorrect: (state) => dispatch(userCorrectAnswer(state)),
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Trivia.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string,
  difficulty: PropTypes.string,
  question: PropTypes.string,
  correctAnswer: PropTypes.string,
  buttonValidation: PropTypes.func,
  incorrectAnswers: PropTypes.arrayOf(
    PropTypes.string,
  ),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

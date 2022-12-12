import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexQuestions: 0,
      tokenValidation: 0,
      buttonValidated: false,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const fetchTriviaLocal = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const TriviaLocal = await fetchTriviaLocal.json();
    this.setState({
      questions: TriviaLocal.results,
      tokenValidation: TriviaLocal.response_code,
    });
  }

  handleButtonValidation = () => {
    this.setState({ buttonValidated: true });
  }

  ht = () => {
    const { indexQuestions } = this.state;
    const { history } = this.props;
    const magicNumber4 = 4;

    if (indexQuestions < magicNumber4) {
      this.setState((prevState) => ({ indexQuestions: prevState.indexQuestions + 1 }));
    }

    if (indexQuestions === magicNumber4) {
      return history.push('/feedback');
    }
  }

  render() {
    const { questions, indexQuestions, tokenValidation, buttonValidated } = this.state;
    const { history } = this.props;
    const trivia = (question, index) => (<Trivia
      key={ index }
      { ...question }
      buttonValidation={ this.handleButtonValidation }
    />);
    if (tokenValidation !== 0) (history.push('/'));
    return (
      <div>
        <Header />
        <h1>JOGO</h1>
        {questions.map((question, index) => (
          index === indexQuestions
            ? trivia(question, index)
            : null
        ))}
        { buttonValidated
          ? <button type="button" data-testid="btn-next" onClick={ this.ht }>Next</button>
          : null }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Game;

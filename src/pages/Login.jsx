import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { userLogin, fetchTriviaToken } from '../Redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  state = {
    email: '',
    userName: '',
    isBtnDisabled: true,
    image: '',
  };

  handlerImage = (value) => {
    const hashEmail = md5(value).toString();
    this.setState(
      { image: `https://www.gravatar.com/avatar/${hashEmail}` },
    );
  }

  handleInputForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { userName, email } = this.state;
      const re = /\S+@\S+\.\S+/;
      const result = re.test(email);
      if (userName.length >= 1 && result === true) {
        this.setState({
          isBtnDisabled: false,
        });
      } else {
        this.setState({
          isBtnDisabled: true,
        });
      }
    });
    if (name === 'email') this.handlerImage(value);
  }

  hadlerClickButton = async () => {
    const magicNumber = 1000;
    const { login, fetchToken, history } = this.props;
    const { email, userName, image } = this.state;
    login({ email, userName, image });
    await fetchToken();
    setTimeout(history.push('/game'), magicNumber);
  }

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { email, userName, isBtnDisabled } = this.state;
    return (
      <div>
        <div className="container-img">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <label htmlFor="input-name">
          Name
          <input
            id="input-name"
            type="text"
            value={ userName }
            name="userName"
            data-testid="input-player-name"
            onChange={ this.handleInputForm }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            id="input-email"
            type="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputForm }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isBtnDisabled }
          onClick={ this.hadlerClickButton }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickConfig }
        >
          Configurações
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(userLogin(state)),
  fetchToken: () => dispatch(fetchTriviaToken()),
});

Login.propTypes = {
  login: PropTypes.func,
  fetchToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerQuestion } from '../Redux/actions';

let timer;

class Timer extends React.Component {
  state = {
    secondsAmount: 30,
  };

  componentDidMount() {
    const magicNumber1000 = 1000;
    timer = setInterval(() => {
      this.setState((prevState) => ({
        secondsAmount: prevState.secondsAmount - 1,
      }));
    }, magicNumber1000);
  }

  componentDidUpdate() {
    const { secondsAmount } = this.state;
    const { disabled, timerQ } = this.props;
    timerQ(secondsAmount);
    if (secondsAmount === 0 || disabled === true) {
      clearInterval(timer);
    }
  }

  render() {
    const magicNumber60 = 60;
    const { secondsAmount } = this.state;
    const seconds = secondsAmount % magicNumber60;
    const minutes = Math.floor(secondsAmount / magicNumber60);
    return (
      <>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timerQ: (state) => dispatch(timerQuestion(state)),
});

Timer.propTypes = {
  secondsAmount: PropTypes.number,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);

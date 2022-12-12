import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userName, score, image } = this.props;
    return (
      <div className="user-header">
        <header>
          <img
            className="user-profile-img"
            src={ image }
            alt="user avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name" className="header-name">{userName}</h3>
          <h2 data-testid="header-score" className="header-score">{score}</h2>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
  score: PropTypes.number,
  image: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userName: state.player.userName,
  score: state.player.score,
  image: state.player.image,
});

export default connect(mapStateToProps)(Header);

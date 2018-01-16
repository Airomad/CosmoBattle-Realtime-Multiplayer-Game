import React from 'react';
import { connection } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MAIN_SCREEN, PROFILER_SCREEN, GAME_SCREEN } from 'constants';

import MainScreenContainer from 'containers/MainScreenContainer';
import NetworkProfilerContainer from 'containers/NetworkProfilerContainer';
import GameScreenContainer from 'containers/GameScreenContainer';

import style from './style.scss';

const mapStateToProps = state => ({
  clientName: state.client.name,
  socket: state.client.socket,
  connected: state.client.connected,
  connecting: state.client.connecting,
});

const mapDispatchToProps = dispatch => ({
  onTryConnect: clientName => dispatch(connection(clientName)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: MAIN_SCREEN,
      prevScreen: null,
    };
    this.allScreens = [
      MAIN_SCREEN,
      PROFILER_SCREEN,
      GAME_SCREEN,
    ];
  }

  onSendMessage = (message) => {
    if (this.props.socket) {
      this.props.socket.send(message);
    }
  }

  onSetScreen = (screen) => {
    if (this.allScreens.includes(screen)) {
      this.setState({
        screen,
        prevScreen: this.state.screen,
      });
    }
  }

  onPopScreen = () => {
    if (this.state.prevScreen) {
      if (this.allScreens.includes(this.state.prevScreen)) {
        this.setState({
          screen: this.state.prevScreen,
          prevScreen: null,
        });
      }
    } else {
      this.setState({ screen: GAME_SCREEN });
    }
  }

  renderScreen = () => {
    switch (this.state.screen) {
      default:
      case MAIN_SCREEN: return (
        <MainScreenContainer
          clientName={this.props.clientName}
          connecting={this.props.connecting}
          connected={this.props.connected}
          onSendMessage={this.onSendMessage}
          onTryConnect={this.props.onTryConnect}
          onSetScreen={this.onSetScreen}
        />
      );
      case PROFILER_SCREEN: return (
        <NetworkProfilerContainer
          onSetScreen={this.onSetScreen}
        />
      );
      case GAME_SCREEN: return (
        <GameScreenContainer
          onSetScreen={this.onSetScreen}
        />
      );
    }
  }

  renderProfilerBtn = () => (
    <button
      className={style.profilerBtn}
      onClick={() => {
        if (this.state.screen !== PROFILER_SCREEN) {
          this.onSetScreen(PROFILER_SCREEN);
        } else {
          this.onPopScreen();
        }
      }}
    >
      {this.state.screen !== PROFILER_SCREEN ? 'Open profiler' : 'Close profiler'}
    </button>
  );

  render() {
    return (
      <div className={style.container}>
        {this.renderScreen()}
        {this.renderProfilerBtn()}
      </div>
    );
  }
}

AppContainer.propTypes = {
  onTryConnect: PropTypes.func,
  socket: PropTypes.func,
  clientName: PropTypes.string,
  connecting: PropTypes.bool,
  connected: PropTypes.bool,
};

AppContainer.defaultProps = {
  onTryConnect: undefined,
  socket: undefined,
  clientName: null,
  connecting: false,
  connected: false,
};

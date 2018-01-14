import React from 'react';
import { connection } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainScreenContainer from 'containers/MainScreenContainer';

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
  onSendMessage = (message) => {
    if (this.props.socket) {
      this.props.socket.send(message);
    }
  }

  render() {
    return (
      <div className={style.container}>
        <MainScreenContainer
          clientName={this.props.clientName}
          connecting={this.props.connecting}
          connected={this.props.connected}
          onSendMessage={this.onSendMessage}
          onTryConnect={this.props.onTryConnect}
        />
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

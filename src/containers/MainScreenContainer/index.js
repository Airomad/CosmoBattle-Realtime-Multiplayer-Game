import React from 'react';
import { connection } from 'actions';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';
import PropTypes from 'prop-types';
import { GAME_SCREEN } from 'constants';
import style from './style.scss';

const mapStateToProps = state => ({
  clientName: state.client.name,
  socket: state.client.socket,
});

const mapDispatchToProps = dispatch => ({
  onConnect: clientName => dispatch(connection(clientName)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MainScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connected && !nextProps.connecting) {
      this.props.onSetScreen(GAME_SCREEN);
    }
  }

  connect = () => {
    // TODO: take the name from input and add input validation
    if (this.props.onTryConnect) {
      this.props.onTryConnect('Jon Snow');
    }
  }

  sendMessageTest = (message) => {
    this.props.onSendMessage(message);
  }

  render() {
    return (
      <div className={style.container}>
        <Loading isLoading={this.props.connecting}>
          <div className={style.loginContainer}>
            <div className={style.titleLabel}>Please, select your name</div>
            <input type="text" className={style.input} placeholder="Your name" />
            <button className={style.button} onClick={this.connect}>Start game</button>
            <button className={style.button} onClick={() => this.sendMessageTest('Hello there!')}>Send hello</button>
          </div>
        </Loading>
      </div>
    );
  }
}

MainScreenContainer.propTypes = {
  onTryConnect: PropTypes.func.isRequired,
  onSetScreen: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  // clientName: PropTypes.string.isRequired,
};


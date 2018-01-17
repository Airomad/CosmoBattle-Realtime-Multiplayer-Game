import React from 'react';
import { connection } from 'actions';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';
import PropTypes from 'prop-types';
import { GAME_SCREEN } from 'constants';
import { CONNECTION_OPEN, CONNECTION_CONNECTING } from 'constants/connection';

import style from './style.scss';

const mapStateToProps = state => ({
  clientName: state.client.name,
  connectionStatus: state.client.connectionStatus,
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
      inputName: '',
      inputValid: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connectionStatus === CONNECTION_OPEN) {
      this.props.onSetScreen(GAME_SCREEN);
    }
  }

  handleInputChange = (event) => {
    const data = event.target.value;
    let inputValid = false;
    if (data.length > 3 && data.length < 20) {
      inputValid = true;
    }
    this.setState({
      inputName: event.target.value,
      inputValid,
    });
  }

  submit = () => {
    if (this.state.inputValid) {
      if (this.props.onTryConnect) {
        this.props.onTryConnect(this.state.inputName);
      }
    }
  }

  render() {
    return (
      <div className={style.container}>
        <Loading isLoading={this.props.connectionStatus === CONNECTION_CONNECTING}>
          <div className={style.loginContainer}>
            <div className={style.titleLabel}>Please, select your name</div>
            <input
              type="text"
              className={style.input}
              onChange={this.handleInputChange}
              value={this.state.inputName}
              placeholder="Your name"
            />
            <button className={style.button} onClick={this.submit}>Start game</button>
          </div>
        </Loading>
      </div>
    );
  }
}

MainScreenContainer.propTypes = {
  onTryConnect: PropTypes.func.isRequired,
  onSetScreen: PropTypes.func.isRequired,
  connectionStatus: PropTypes.number.isRequired,
};


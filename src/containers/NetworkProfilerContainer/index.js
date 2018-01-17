import React from 'react';
import Loading from 'react-loading-animation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  CONNECTION_OPEN,
  CONNECTION_CONNECTING,
  CONNECTION_CLOSED,
} from 'constants/connection';

import style from './style.scss';

const mapStateToProps = state => ({
  clientName: state.profiler.name,
  socket: state.profiler.socket,
  connectionStatus: state.profiler.connectionStatus,
  messages: state.profiler.messages,
});

const mapDispatchToProps = dispatch => ({
  onConnect: clientName => dispatch(clientName),
  onSendMessage: message => dispatch({ type: 'PROFILER_MESSAGE', message }),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class NetworkProfilerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  connect = () => {
    if (this.props.onTryConnect) {
      this.props.onTryConnect('Tester1');
    }
  }

  sendMessage = (message) => {
    this.props.onSendMessage(message);
    this.props.socket.send(message);
  }

  printConsoleLog = () => {
    const log = [];
    if (this.props.messages.length > 0) {
      this.props.messages.map((it) => {
        const type = <span className={it[0] === 'GET' ? style.green : style.orange}>{it[0]}</span>;
        return log.unshift(<div>{type} {it[1]}</div>);
      });
    }
    return log;
  }

  sendHello = () => {
    this.sendMessage('Hello');
  }

  disconnect = () => {
    this.props.socket.close();
  }

  sendInitPacket = () => {
    const packet = JSON.stringify({
      type: 'INIT',
      session: 'Session',
      username: 'Username',
    });
    this.sendMessage(packet);
  }

  sendVelocityPacket = () => {
    const packet = JSON.stringify({
      type: 'VELOCITY',
      session: 'Session',
      username: 'Username',
      x: 23,
      y: -324,
    });
    this.sendMessage(packet);
  }

  renderConnectionStatus = () => (
    <div className={style.connectionLabel}>
      Connection status:
      {this.props.connectionStatus === CONNECTION_OPEN &&
        <span className={style.green}> Open</span>
      }
      {this.props.connectionStatus === CONNECTION_CONNECTING &&
        <span className={style.orange}> Connecting</span>
      }
      {this.props.connectionStatus === CONNECTION_CLOSED &&
        <span className={style.red}> Closed</span>
      }
    </div>
  );

  render() {
    return (
      <div className={style.container}>
        <Loading isLoading={this.props.connectionStatus === CONNECTION_CONNECTING}>
          <div className={style.top}>
            <div className={style.left}>
              <div className={style.pan}>
                {this.renderConnectionStatus()}

                <div className={style.separator} />
                <button className={style.button} onClick={this.sendHello}>Send Hello</button>
                <button className={`${style.button} ${style.red}`} onClick={this.disconnect}>Disconnect</button>
                <button className={`${style.button} ${style.green}`} onClick={this.connect}>Connect</button>

                <div className={style.separator} />
                <div className={style.title}>Send Packets</div>
                <button className={style.button} onClick={this.sendInitPacket}>Init</button>
                <button
                  className={style.button}
                  onClick={this.sendVelocityPacket}
                >
                  SetVelocity
                </button>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.pan}>
                <div className={style.title}>Packets</div>
              </div>
            </div>
          </div>
          <div className={style.bottom}>
            <div className={style.left}>
              <div className={style.pan}>
                Reserved
              </div>
            </div>
            <div className={style.right}>
              <div className={style.pan}>
                <div className={style.title}>Console log</div>
                <div className={style.scrollable}>
                  {this.printConsoleLog()}
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    );
  }
}

NetworkProfilerContainer.propTypes = {
  onTryConnect: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  // onSetScreen: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  socket: PropTypes.func.isRequired,
  connectionStatus: PropTypes.number.isRequired,
  // connected: PropTypes.bool.isRequired,
  // clientName: PropTypes.string.isRequired,
};


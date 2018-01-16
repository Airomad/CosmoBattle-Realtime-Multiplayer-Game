import React from 'react';
import Loading from 'react-loading-animation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './style.scss';

const mapStateToProps = state => ({
  clientName: state.profiler.name,
  socket: state.profiler.socket,
  connecting: state.profiler.connecting,
  connected: state.profiler.connected,
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
    // TODO: take the name from input and add input validation
    if (this.props.onTryConnect) {
      this.props.onTryConnect('Jon Snow');
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

  render() {
    return (
      <div className={style.container}>
        <Loading isLoading={this.props.connecting}>
          <div className={style.top}>
            <div className={style.left}>
              <div className={style.pan}>
                <button className={style.button} onClick={this.sendHello}>Send Hello</button>

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
  // connected: PropTypes.bool.isRequired,
  // clientName: PropTypes.string.isRequired,
};


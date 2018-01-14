import React from 'react';
import { connection } from 'actions';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';
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
      connecting: false,
    };
  }

  onSendMessage = (message) => {
    this.props.socket.send(message);
  }

  connect = () => {
    this.props.onConnect('Jojo');
  }

  render() {
    return (
      <div className={style.container}>
        <Loading isLoading={this.state.connecting}>
          <div className={style.loginContainer}>
            <div className={style.titleLabel}>Please, select your name</div>
            <input type="text" className={style.input} placeholder="Your name" />
            <button className={style.button} onClick={this.connect}>Start game</button>
            <button className={style.button} onClick={() => this.onSendMessage('Hello there!')}>Send hello</button>
          </div>
        </Loading>
      </div>
    );
  }
}

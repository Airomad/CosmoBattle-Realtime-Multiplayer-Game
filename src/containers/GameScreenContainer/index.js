import React from 'react';
import { connect } from 'react-redux';
import { MAIN_SCREEN } from 'constants';
import { CONNECTION_OPEN, CONNECTION_CLOSED } from 'constants/connection';
import PropTypes from 'prop-types';
import style from './style.scss';

const mapStateToProps = state => ({
  clientName: state.client.name,
  connectionStatus: state.client.connectionStatus,
});

@connect(mapStateToProps)
export default class GameScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connectionStatus !== CONNECTION_OPEN) {
      this.props.onSetScreen(MAIN_SCREEN);
    }
  }

  render() {
    return (
      <div className={style.container}>
        Game screen
      </div>
    );
  }
}

GameScreenContainer.propTypes = {
  onSetScreen: PropTypes.func.isRequired,
  connectionStatus: PropTypes.number,
};

GameScreenContainer.defaultProps = {
  connectionStatus: CONNECTION_CLOSED,
};


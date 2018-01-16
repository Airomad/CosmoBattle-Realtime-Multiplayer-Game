import React from 'react';
import style from './style.scss';

export default class GameScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={style.container}>
        Game screen
      </div>
    );
  }
}


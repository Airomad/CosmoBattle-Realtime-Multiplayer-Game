import React from 'react';
import MainScreenContainer from 'containers/MainScreenContainer';
import style from './style.scss';

export default function AppContainer() {
  return (
    <div className={style.container}>
      <MainScreenContainer />
    </div>
  );
}

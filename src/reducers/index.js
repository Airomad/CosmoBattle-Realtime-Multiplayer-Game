import { combineReducers } from 'redux';
import player from './player';
import client from './client';

export default combineReducers({
  player,
  client,
});

import { combineReducers } from 'redux';
import player from './player';
import client from './client';
import profiler from './profiler';

export default combineReducers({
  player,
  client,
  profiler,
});

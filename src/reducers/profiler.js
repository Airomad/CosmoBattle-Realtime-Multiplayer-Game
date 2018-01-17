import {
  WS_CONNECTION_BEGIN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSE_CLEAN,
  WS_CONNECTION_CLOSE_ERROR,
  WS_GET_MESSAGE,
  WS_GET_ERROR,
} from 'actions/action-types';
import {
  CONNECTION_OPEN,
  CONNECTION_CONNECTING,
  CONNECTION_CLOSED,
} from 'constants/connection';

const INIT_STATE = {
  name: undefined,
  connectionStatus: CONNECTION_CLOSED,
  socket: undefined,
  messages: [],
};

function getMessagePrefix() {
  const date = new Date();
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}] `;
}

export default function profiler(state = INIT_STATE, action) {
  switch (action.type) {
    case WS_CONNECTION_BEGIN: return {
      ...state,
      connectionStatus: CONNECTION_CONNECTING,
    };

    case WS_CONNECTION_SUCCESS: return {
      ...state,
      messages: [...state.messages, ['', `Connected as ${action.clientName}`]],
      name: action.clientName,
      connectionStatus: CONNECTION_OPEN,
      socket: action.socket,
    };

    case WS_CONNECTION_CLOSE_ERROR:
    case WS_CONNECTION_CLOSE_CLEAN: return {
      ...state,
      messages: [...state.messages, ['', 'Disconnected..']],
      connectionStatus: CONNECTION_CLOSED,
    };

    case WS_GET_MESSAGE: return {
      ...state,
      messages: [...state.messages, ['GET', getMessagePrefix() + action.message]],
    };

    case WS_GET_ERROR:
      return state;

    case 'PROFILER_MESSAGE': return {
      ...state,
      messages: [...state.messages, ['SEND', getMessagePrefix() + action.message]],
    };

    default: return state;
  }
}

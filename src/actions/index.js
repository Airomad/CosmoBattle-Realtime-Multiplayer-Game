import {
  WS_CONNECTION_BEGIN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSE_CLEAN,
  WS_CONNECTION_CLOSE_ERROR,
  WS_GET_MESSAGE,
  WS_GET_ERROR,
  WS_SEND_MESSAGE,
} from './action-types';

export function connectionBegin() {
  return {
    type: WS_CONNECTION_BEGIN,
  };
}

export function connectionSuccess(socket, clientName) {
  return {
    type: WS_CONNECTION_SUCCESS,
    socket,
    clientName,
  };
}

export function connectionCloseClean() {
  return {
    type: WS_CONNECTION_CLOSE_CLEAN,
  };
}

export function connectionCloseError(errorCode, reason) {
  return {
    type: WS_CONNECTION_CLOSE_ERROR,
    errorCode,
    reason,
  };
}

export function getError(error) {
  return {
    type: WS_GET_ERROR,
    error,
  };
}

export function getMessage(message) {
  return {
    type: WS_GET_MESSAGE,
    message,
  };
}

export function sendMessage(message) {
  return {
    type: WS_SEND_MESSAGE,
    message,
  };
}

export const connection = clientName => (dispatch) => {
  dispatch(connectionBegin());
  const socket = new WebSocket('ws://demos.kaazing.com/echo');
  socket.onopen = () => dispatch(connectionSuccess(socket, clientName));
  socket.onmessage = message => dispatch(getMessage(message.data));
  socket.onerror = error => dispatch(getError(error.message));
  socket.onclose = (event) => {
    if (event.wasClean) {
      dispatch(connectionCloseClean());
    } else {
      dispatch(connectionCloseError(event.code, event.reason));
    }
  };
};

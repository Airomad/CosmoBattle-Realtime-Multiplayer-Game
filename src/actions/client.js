import {
  SEND_BYTES,
  SEND_CHAT_MESSAGE,
} from './action-types';

export function sendBytes(commandID, data) {
  return {
    type: SEND_BYTES,
    ...data,
  };
}

export function sendChatMessage(clientID, message) {
  return {
    type: SEND_CHAT_MESSAGE,
    message,
  };
}

import {
  SEND_COMMAND,
  SEND_CHAT_MESSAGE,
} from './action-types';

export function sendCommand(commandID, data) {
  return {
    type: SEND_COMMAND,
    ...data,
  };
}

export function sendChatMessage(clientID, message) {
  return {
    type: SEND_CHAT_MESSAGE,
    message,
  };
}

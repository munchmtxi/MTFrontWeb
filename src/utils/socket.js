import socket from '../api/socket/socketApi';

export const emitEvent = (event, data) => {
  socket.emit(event, data);
};
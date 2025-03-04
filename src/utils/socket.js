 
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:3000';

const socket = io(BASE_URL, {
  auth: { token: localStorage.getItem('token') },
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => console.log('Connected to Socket.IO'));
socket.on('disconnect', () => console.log('Disconnected from Socket.IO'));

export default socket;
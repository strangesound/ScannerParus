import { reactive } from 'vue';
import { io } from 'socket.io-client';

const state = reactive({
  currentValue: 1
});

const socket = io('http://localhost:3000');

socket.on('modbus-data', (data) => {
  state.currentValue = data*-1;
});

export default state;
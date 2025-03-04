 
import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
    events: [],
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
      // Limit to last 10 events to avoid memory issues
      if (state.events.length > 10) state.events.shift();
    },
  },
});

export const { setConnected, addEvent } = socketSlice.actions;
export default socketSlice.reducer;
// redux/slices/socketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState = {
    gymName: '',
    userId: '',
};

const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    setGymName: (state, action) => {
      state.gymName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setGymName, setUserId} = gymSlice.actions;

export default gymSlice.reducer;


// ,
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//     },
//     addInvite: (state, action) => {
//       state.invites.push(action.payload);
//     },
//     addSet: (state, action) => {
//       state.sets.push(action.payload);
//     },
//     removeInvite: (state, action) => {
//       state.invites = state.invites.filter(invite => invite.gymName !== action.payload);
//     },
//     addNotification(state, action) {
//         state.notifications.push(action.payload);
//     },
import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    members: [],
    activeNavbar: false,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload;
    },
    countMem: (state, action) => {
      state.members = action.payload;
    },
    activeMenu: (state, action) => {
      state.activeNavbar = action.payload;
    },
  },
});

const combineActions = {
  ...actions,
};

export { combineActions as appActions, reducer };
export const selectRoomId = (state) => state.app.roomId;
export const selectMember = (state) => state.app.members;
export const selectActiveNavbar = (state) => state.app.activeNavbar;

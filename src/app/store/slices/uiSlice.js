import { createSlice } from '@reduxjs/toolkit';
const uiSlice = createSlice({
  name:'ui', initialState:{ sidebarOpen:false, selectedProfile:null, selectedMessageFriendId:null },
  reducers:{
    setSidebarOpen(state, action){ state.sidebarOpen = action.payload; },
    setSelectedProfile(state, action){ state.selectedProfile = action.payload; },
    setSelectedMessageFriendId(state, action){ state.selectedMessageFriendId = action.payload; },
    clearSelectedProfile(state){ state.selectedProfile = null; },
  },
});
export const { setSidebarOpen, setSelectedProfile, setSelectedMessageFriendId, clearSelectedProfile } = uiSlice.actions;
export default uiSlice.reducer;

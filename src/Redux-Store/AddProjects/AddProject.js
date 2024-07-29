import { createSlice } from '@reduxjs/toolkit';

const AddProjectSlice = createSlice({
  name: 'AddProject',
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addProject, updateStoreStatus } = AddProjectSlice.actions;
export default AddProjectSlice.reducer;
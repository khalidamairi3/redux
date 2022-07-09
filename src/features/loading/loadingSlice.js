import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../users/usersSlice";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducer: {},
  extraReducers: {
    [fetchUsers.pending]: () => {
      return true;
    },
    [fetchUsers.fulfilled]: () => {
      return false;
    },
    [fetchUsers.rejected]: () => {
      return false;
    },
  },
});

export default loadingSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // <thunk name>.<promise state> : (state, action) => {}
    // action contains a payload that equals to the return value of the thunk
    [fetchUsers.fulfilled]: (state, action) => {
      console.log("extra reducer for fetchUsers when fullfilled", action);
      return action.payload; // array of users
    },
    [fetchUsers.rejected]: (state) => {
      console.log("extra reducer for fetchUsers when rejected");
    },
    [fetchUsers.pending]: (state) => {
      console.log("extra reducer for fetchUsers when pending");
    },
  },
});

// selectors
export const selectUsers = (state) => state.users;

export default usersSlice.reducer;

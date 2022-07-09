import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import loadingReducer from "../features/loading/loadingSlice";

export const store = configureStore({
  reducer: {
    // each of our reducers
    posts: postsReducer,
    users: usersReducer,
    loading: loadingReducer,
  },
});

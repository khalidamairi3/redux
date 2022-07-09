import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios';


const FETCH_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(FETCH_POSTS_URL);
    return response.data; // the payload of the action
  } catch (error) {
    return error.message;
  }
});

const initialPostsState = [
  {
    id: "1",
    title: "Happy Saturday",
    content: "Wake in the morning, go for a run, and then zumba",
    userId: 1,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices",
    content: "Slice of pie? Slice of pizza? Slice of cake? Any Slice...",
    userId: 2,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "3",
    title: "Chat with David",
    content: "Learning Mambo Salsa",
    userId: 3,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    // action type: reducer function for this action
    addPost: {
      reducer(state, action) {
        // state refers to the posts state which is an array
        // return [...state, action.payload]
        // redux toolkit uses the Immer.js library
        // passes a draft of the state, and then after it detects the changes and creates
        // a new state
        state.push(action.payload); // payload is the new post object
      },
      prepare(title, content, userId) {
        // action object
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reactionKey } = action.payload;
      const post = state.find(p => p.id === postId);
      if (post) { // found the post
        post.reactions[reactionKey] += 1;
      }
    },
  },
  extraReducers: {
    // posts/fetchPosts/fulfilled
    [fetchPosts.fulfilled]: (state, action) => {
      const posts = action.payload;
      let min = 0;
      const loadedposts = posts.map(post => {
        min++;
        // new post with additional properties (date, reactions)
        return {
          ...post,
          date: sub(new Date(), { minutes: min }).toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        }
      });
      return loadedposts;
    }
  },
});

// export action creators
export const { addPost, reactionAdded } = postsSlice.actions;

// selectors
export const selectPosts = (state) => state.posts;

// named exported
// export const postssReducer = postsSlice.reducer;
// default export
export default postsSlice.reducer;

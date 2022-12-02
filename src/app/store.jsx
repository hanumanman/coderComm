import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../features/comment/commentSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import friendReducer from "../features/friend/friendSlice";

const store = configureStore({
  reducer: {
    comment: commentsReducer,
    user: userReducer,
    post: postReducer,
    friend: friendReducer,
  },
});

export default store;

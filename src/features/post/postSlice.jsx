import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import useAuth from "../../hooks/useAuth";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

const slice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      console.log(`NEWPOST ISSSSSSSSSSSS`, newPost);
      if (state.currentPagePosts.length % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },
    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload, `PAYLOADDDDDDDD`);
      state.currentPagePosts = state.currentPagePosts.filter(
        (post) => post !== action.payload._id
      );
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
    resetPost(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },
    updatePostSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imgUrl = await cloudinaryUpload(image);

      const response = await apiService.post("/posts", {
        content,
        image: imgUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.data));
      toast.success("Post success!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const editPost =
  ({ content, image, postId, userId, page }) =>
  async (dispatch) => {
    console.log(`content`, content, `image`, image, `postid`, postId);
    dispatch(slice.actions.startLoading());

    try {
      const imgUrl = await cloudinaryUpload(image);

      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image: imgUrl,
      });

      dispatch(slice.actions.updatePostSuccess(response.data));
      dispatch(getPosts({ userId, page }));
      toast.success("Post updated");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getPosts =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });

      if (page === 1) dispatch(slice.actions.resetPost());
      dispatch(slice.actions.getPostSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      console.log(state.currentPagePosts);
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePost =
  ({ postId, page, userId }) =>
  async (dispatch) => {
    console.log(`DELETE`, postId);
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/posts/${postId}`);

      dispatch(slice.actions.deletePostSuccess(response.data));

      toast.success("Post deleted");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;

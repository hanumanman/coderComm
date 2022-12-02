import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { currentPagePosts, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);
  console.log(`GET POST`, posts, `page = ${page}`);
  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);

  return (
    <>
      {posts?.map((post) => (
        <PostCard key={post._id || ""} post={post} page={page} />
      ))}
      {totalPosts ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            onClick={() => setPage((page) => page + 1)}
            variant="outlined"
            size="small"
            loading={isLoading}
          >
            Load moar
          </LoadingButton>
        </Box>
      ) : (
        <Typography variant="h6">No Post Yet</Typography>
      )}
    </>
  );
}

export default PostList;

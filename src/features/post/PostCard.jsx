import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import useAuth from "../../hooks/useAuth";
import OptionMenu from "../../app/components/OptionMenu";
import PostEditForm from "./PostEditForm";

function PostCard({ post, page }) {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const currentUserId = user._id;

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          currentUserId === post.author?._id && (
            <OptionMenu
              postId={post._id}
              target={"post"}
              setIsEditing={setIsEditing}
              userId={currentUserId}
            />
          )
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {!isEditing ? (
          <>
            <Typography>{post.content}</Typography>
            {post.image && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: 300,
                  "& img": { objectFit: "cover", width: 1, height: 1 },
                }}
              >
                <img src={post.image} alt="post" />
              </Box>
            )}

            <PostReaction post={post} />
          </>
        ) : (
          <PostEditForm post={post} setIsEditing={setIsEditing} page={page} />
        )}
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;

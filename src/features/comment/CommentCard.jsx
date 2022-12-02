import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import OptionMenu from "../../app/components/OptionMenu";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { updateComments } from "./commentSlice";

function CommentCard({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);
  const { user } = useAuth();
  const cmtId = user._id;
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const handleUpdateComment = (e) => {
    e.preventDefault();
    console.log(`TARGETTTT`, e.target.value);
    console.log(`EDITTTTTTTTTTTTTTTTTTTTT`);
    dispatch(
      updateComments({
        commentId: comment._id,
        postId: comment.post,
        content: editComment,
      })
    );
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {comment.author?.name}
              {""}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
          </Stack>
          {isEditing ? (
            <>
              <form onSubmit={handleUpdateComment}>
                <Container
                  sx={{ display: "flex", paddingLeft: "0 !important" }}
                >
                  <TextField
                    autoFocus={true}
                    inputRef={inputRef}
                    size="small"
                    placeholder="Edit commment"
                    value={editComment}
                    onChange={(event) => setEditComment(event.target.value)}
                    sx={{
                      width: "90%",
                      ml: 0,
                      mr: 1,
                      "&fieldset": {
                        borderWidth: "1px !important",
                        borderColor: (theme) =>
                          `${theme.palette.grey[500_32]} !important`,
                      },
                    }}
                  />
                  <Button type="submit">
                    <SendIcon />
                  </Button>
                </Container>
              </form>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {comment.content}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CommentReaction comment={comment} />
              </Box>
            </>
          )}
        </Paper>
        {cmtId === comment.author._id && (
          <OptionMenu
            postId={comment.post}
            commentId={comment._id}
            target={"comment"}
            setIsEditing={setIsEditing}
          />
        )}
      </Stack>
    </>
  );
}

export default CommentCard;

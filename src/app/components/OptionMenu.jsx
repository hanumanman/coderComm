import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../features/post/postSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteComments } from "../../features/comment/commentSlice";

function OptionMenu({ commentId, postId, target, setIsEditing, userId }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    handleClose();
    setDialogOpen(false);
  };

  const handleDelete = (e) => {
    if (target === "post") {
      //dispatch delete post
      dispatch(deletePost({ postId, userId }));
    } else if (target === "comment") {
      dispatch(deleteComments({ commentId, postId }));
    }
  };

  const handleEdit = () => {
    handleClose();
    setIsEditing(true);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleEdit}> Edit</MenuItem>

        <MenuItem onClick={handleDialogOpen}> Delet</MenuItem>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete ${target}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Are you sure you want to delete this ${target}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={handleDelete} autoFocus variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

export default OptionMenu;

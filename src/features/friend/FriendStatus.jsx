import { Chip } from "@mui/material";
import React from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";

function FriendStatus({ currentUserId, targetUserId, friendship, sx }) {
  if (currentUserId === targetUserId) return null;
  if (!friendship) return null;
  if (friendship.status === "accepted") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<CheckCircleOutlineRoundedIcon />}
        label="friend"
        color="success"
      />
    );
  }

  if (friendship.status === "declined") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<DoNotDisturbAltRoundedIcon />}
        label="declined"
        color="error"
      />
    );
  }

  if (friendship.status === "pending") {
    const { from, to } = friendship;
    if (from === currentUserId && to === targetUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<MarkEmailReadRoundedIcon />}
          label="Request Sent"
          color="warning"
        />
      );
    } else if (from === targetUserId && to === currentUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<PauseCircleFilledRoundedIcon />}
          label="Waiting for response"
          color="warning"
        />
      );
    }
  }
}

export default FriendStatus;

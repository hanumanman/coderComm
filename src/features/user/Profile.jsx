import { Grid, Stack } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import ProfileAbout from "./ProfileAbout";
import ProfileScoreCard from "./ProfileScoreCard";
import ProfileSocialInfo from "./ProfileSocialInfo";

function Profile({ profile }) {
  const { user } = useAuth();
  console.log(profile);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScoreCard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        {user?._id === profile?._id && <PostForm />}
        <PostList userId={profile._id} />
      </Grid>
    </Grid>
  );
}

export default Profile;

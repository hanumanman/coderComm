import React, { useCallback } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../../app/components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { editPost, getPosts } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import FUploadImage from "../../app/components/form/FUploadImg";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: null,
};

function PostEditForm({ post, setIsEditing, page }) {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    data["page"] = page;
    data["postId"] = `${post._id}`;
    data["userId"] = `${post.author._id}`;
    setIsEditing(false);
    dispatch(editPost(data)).then(() => reset());
    // dispatch(getPosts());
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept={{
              "image/*": [".jpeg", ".png"],
            }}
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              EDIT
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostEditForm;

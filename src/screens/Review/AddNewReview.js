import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Rating,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useEditReviewMutation,
  useGetReviewByIdQuery,
} from "../../redux/apis/reviewapis";
import toast from "react-hot-toast";

const ReviewForm = ({ edit = false }) => {
  const navigate = useNavigate();
  const { reviewID } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      review: "",
      rating: 2,
      user_profile: "",
      is_feature: false, // Default value for is_feature
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch review data if edit mode
  const { data: existingReview, isSuccess: isReviewLoaded } =
    useGetReviewByIdQuery(reviewID, { skip: !edit });

  // RTK mutations
  const [createReview] = useAddReviewMutation();
  const [updateReview] = useEditReviewMutation();

  useEffect(() => {
    if (isReviewLoaded && edit) {
      const { name, review, rating, user_profile, is_feature } =
        existingReview?.data;
      setValue("name", name);
      setValue("review", review);
      setValue("rating", rating);
      setValue("is_feature", is_feature || false);
      setPreview(user_profile || null);
    }
  }, [isReviewLoaded, existingReview, edit, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("review", data.review);
    formData.append("rating", data.rating);
    formData.append("is_feature", data.is_feature);
    if (selectedImage) {
      formData.append("user_profile", selectedImage);
    }

    try {
      if (edit) {
        const response = await updateReview({
          id: reviewID,
          reviewData: formData,
        }).unwrap();
        if (response?.status === 200) {
          toast.success("Review updated successfully");
          navigate("/review");
        } else {
          toast.error("Failed to update review");
        }
      } else {
        const response = await createReview(formData).unwrap();
        if (response?.status === 201) {
          toast.success("Review created successfully");
          navigate("/review");
        } else {
          toast.error("Failed to create review");
        }
      }

      reset();
      setPreview(null);
      setSelectedImage(null);
    } catch (error) {
      toast.error(`Failed to ${edit ? "update" : "create"} review`);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate("/review")}
        >
          Reviews
        </Link>
        <Typography color="text.primary">
          {edit ? "Edit Review" : "Add Review"}
        </Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {edit ? "Edit Your Review" : "Submit Your Review"}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name Field */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  size="small"
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message || ""}
                />
              )}
            />

            {/* Review Field */}
            <Controller
              name="review"
              control={control}
              rules={{ required: "Review is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Review"
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  margin="normal"
                  error={!!errors.review}
                  helperText={errors.review?.message || ""}
                />
              )}
            />

            {/* Rating Field */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <Rating
                    {...field}
                    precision={1}
                    value={Number(field.value)}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
              {errors.rating && (
                <Typography color="error">{errors.rating.message}</Typography>
              )}
            </Box>

            {/* Image Upload */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography>Upload Profile Image</Typography>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              {preview && (
                <Box
                  mt={2}
                  sx={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={preview}
                    alt="Profile Preview"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              )}
            </Box>

            {/* Is Feature Switch */}
            <Box sx={{ marginBottom: 2 }}>
              <FormControlLabel
                control={
                  <Controller
                    name="is_feature"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Feature Review"
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              {edit ? "Update Review" : "Submit Review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReviewForm;

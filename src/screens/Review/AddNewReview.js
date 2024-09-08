import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography, Rating } from "@mui/material";

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
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
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
      const { name, review, rating } = existingReview?.data;
      setValue("name", name);
      setValue("review", review);
      setValue("rating", rating);
      setPreview(existingReview?.data?.user_profile || null);
    }
  }, [isReviewLoaded, existingReview, edit, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("review", data.review);
    formData.append("rating", data.rating);
    if (selectedImage) {
      formData.append("user_profile", selectedImage);
    }

    try {
      if (edit) {
        // Update review if in edit mode
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
        // Create new review if in create mode
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
      console.error("Error submitting review", error);
      toast.error(`Failed to ${edit ? "update" : "create"} review`);
    }
  };

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>Reviews</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item"
                    onClick={() => {
                      navigate("/review");
                    }}
                  >
                    Reviews Listing
                  </li>
                  <li className="breadcrumb-item active">Add New Reviews</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-12 ">
            <div className="card">
              <div className="card-header">
                <h5> {edit ? "Edit Your Review" : "Submit Your Review"}</h5>
              </div>
              <form
                className="form theme-form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ padding: "20px" }}
              >
                {/* Name Field */}
                <TextField
                  {...register("name", { required: "Name is required" })}
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />

                {/* Review (Description) Field */}
                <TextField
                  {...register("review", {
                    required: "Review is required",
                  })}
                  label="Review"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  error={!!errors.review}
                  helperText={errors.review ? errors.review.message : ""}
                />

                {/* Rating (Star Rating) */}
                <Box sx={{ marginBottom: 2 }}>
                  <Typography component="legend">Rating</Typography>
                  <Controller
                    name="rating"
                    control={control}
                    defaultValue={2}
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
                    <Typography color="error">
                      {errors.rating.message}
                    </Typography>
                  )}
                </Box>

                {/* Image Upload (user_profile) */}
                <Box
                  sx={{
                    marginBottom: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography component="legend">
                      Upload Profile Image
                    </Typography>
                    <input
                      accept="image/*"
                      type="file"
                      {...register("user_profile")}
                      onChange={handleImageChange}
                    />
                  </Box>
                  {preview && (
                    <Box mt={2}>
                      <img
                        src={preview}
                        alt="Profile Preview"
                        width="200"
                        style={{ borderRadius: "7px" }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary">
                  {edit ? "Update Review" : "Submit Review"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewForm;

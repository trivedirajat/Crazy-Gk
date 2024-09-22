import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Grid, Typography, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";
import {
  useAddBlogMutation,
  useEditBlogMutation,
  useGetBlogByIdQuery,
} from "../../redux/apis/blogapis";
import Breadcrumbs from "component/common/Breadcrumbs";

const AddEditBlog = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addBlog, { isLoading: isAddLoading }] = useAddBlogMutation();
  const [editBlog, { isLoading: isEditLoading }] = useEditBlogMutation();
  const { data: blogData, isError } = useGetBlogByIdQuery(id, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      image: null,
    },
  });

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  useEffect(() => {
    if (isEdit && blogData) {
      const { title, description, image } = blogData.data;
      setValue("title", title);
      setContent(description || "");
      setImagePreview(image || null);
    }
  }, [isEdit, blogData, setValue]);

  const onSubmit = async (formData) => {
    const data = new FormData();
    if (formData.image) {
      data.append("image", formData.image[0]); // Use the first file
    }
    data.append("title", formData.title);
    data.append("description", content); // QuillTextEditor HTML

    try {
      if (isEdit) {
        await editBlog({ id, data });
        toast.success("Blog updated successfully!");
      } else {
        await addBlog(data);
        toast.success("Blog added successfully!");
      }
      navigate("/blog");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("image", e.target.files); // Set image file(s) for form submission
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  if (isError) {
    toast.error("Blog not found!");
    navigate("/blog");
    return null;
  }
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Blog", link: "/blog" },
    { label: isEdit ? "Edit Blog" : "Add New Blog" },
  ];
  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? "Edit Blog" : "Add New Blog"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Blog Title"
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="body1">Blog Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "16px" }}
              />
              {imagePreview && (
                <Box
                  mt={2}
                  sx={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="body1">Description</Typography>
              <QuillTextEditor value={content} setContent={setContent} />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isEditLoading || isAddLoading}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddEditBlog;

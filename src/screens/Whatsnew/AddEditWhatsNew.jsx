import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Grid, Typography, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  useAddWhatsNewMutation,
  useEditWhatsNewMutation,
  useGetWhatsNewByIdQuery,
} from "../../redux/apis/whatsnewapis";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddEditWhatsNew = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addWhatsNew] = useAddWhatsNewMutation();
  const [editWhatsNew] = useEditWhatsNewMutation();
  const { data: whatsNewData, isError } = useGetWhatsNewByIdQuery(id, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      image: "",
      description: "",
    },
  });

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  useEffect(() => {
    if (isEdit && whatsNewData) {
      const { title, image, description } = whatsNewData?.data;
      setValue("title", title);
      setImagePreview(image || "");
      setContent(description || "");
    }
  }, [isEdit, whatsNewData, setValue]);

  const onSubmit = async (formData) => {
    const data = new FormData();
    if (formData.image.length > 0) {
      data.append("image", formData.image[0]);
    }
    data.append("title", formData.title);
    data.append("description", content); // QuillTextEditor HTML

    try {
      if (isEdit) {
        await editWhatsNew({ id, data });
        toast.success("Whats New updated successfully!");
      } else {
        const response = await addWhatsNew(data);
        if (response.data) {
          toast.success("Whats New added successfully!");
        } else {
          toast.error(response.error.data.message || "An error occurred!");
        }
      }
      navigate("/whatsnew");
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
      };
      reader.readAsDataURL(file);
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Whats New", link: "/whatsnew" },
    { label: isEdit ? "Edit Whats New" : "Add New Whats New" },
  ];

  if (isError) {
    toast.error("Whats New not found!");
    navigate("/whatsnew");
    return null;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "24px" }}>
          {isEdit ? "Edit Whats New" : "Add New Whats New"}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Title"
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
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      type="file"
                      label="Whats New Image"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      inputProps={{ accept: "image/*" }}
                      onChange={(e) => {
                        field.onChange(e.target.files); // Handle the file change event
                        handleImageChange(e);
                      }}
                      size="small"
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
                  </>
                )}
              />
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
              fullWidth={false}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddEditWhatsNew;

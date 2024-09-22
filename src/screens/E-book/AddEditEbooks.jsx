import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Grid, Typography, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  useAddebooksMutation,
  useEditebooksMutation,
  useGetebooksbyidQuery,
} from "../../redux/apis/ebooksapis";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";

const AddEditEbooks = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addEbook] = useAddebooksMutation();
  const [editEbook] = useEditebooksMutation();
  const { data: ebookData, isError } = useGetebooksbyidQuery(id, {
    skip: !isEdit,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      pdf_link: "",
      image: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEdit && ebookData) {
      const { pdf_link, image } = ebookData?.data;
      setValue("pdf_link", pdf_link);
      setImagePreview(image || "");
    }
  }, [isEdit, ebookData, setValue]);

  const onSubmit = async (formData) => {
    const data = new FormData();
    if (formData.image.length > 0) {
      data.append("image", formData.image[0]);
    }
    data.append("pdf_link", formData.pdf_link);

    try {
      if (isEdit) {
        await editEbook({ id, data });
        toast.success("Ebook updated successfully!");
      } else {
        await addEbook(data);
        toast.success("Ebook added successfully!");
      }
      navigate("/ebooks");
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
    { label: "Ebooks", link: "/ebooks" },
    { label: isEdit ? "Edit Ebook" : "Add New Ebook" },
  ];

  if (isError) {
    toast.error("Ebook not found!");
    navigate("/ebooks");
    return;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          {isEdit ? "Edit Ebook" : "Add New Ebook"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Controller
                name="pdf_link"
                control={control}
                rules={{
                  required: "PDF link is required",
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: "Invalid URL format",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="PDF Link"
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
                      label="Ebook Image"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      inputProps={{ accept: "image/*" }}
                      onChange={(e) => {
                        field.onChange(e.target.files);
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

export default AddEditEbooks;

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Grid, Typography, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  useAddSubjectMutation,
  useEditSubjectMutation,
  useGetSubjectByIdQuery,
} from "../../redux/apis/subjectapi";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddEditSubjects = ({ isedit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addSubject] = useAddSubjectMutation();
  const [editSubject] = useEditSubjectMutation();
  const { data: subjectData, isError } = useGetSubjectByIdQuery(id, {
    skip: !isedit,
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      subject_name: "",
      image: "",
      description: "",
    },
  });

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  useEffect(() => {
    if (isedit && subjectData) {
      const { subject_name, image, description } = subjectData?.data;
      setValue("subject_name", subject_name);
      setImagePreview(image || "");
      setContent(description || "");
    }
  }, [isedit, subjectData, setValue]);

  const onSubmit = async (formData) => {
    const data = new FormData();
    if (formData.image.length > 0) {
      data.append("image", formData.image[0]);
    }
    data.append("subject_name", formData.subject_name);
    data.append("description", content); // QuillTextEditor HTML

    try {
      if (isedit) {
        await editSubject({ id, data });
        toast.success("Subject updated successfully!");
      } else {
        const response = await addSubject(data);
        if (response.data) {
          toast.success("Subject added successfully!");
        }
        if (response.error) {
          toast.error(response.error.data.message || "An error occurred!");
        }
      }
      navigate("/subjects");
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
    { label: "Subjects", link: "/subjects" },
    { label: isedit ? "Edit Subject" : "Add New Subject" },
  ];
  if (isError) {
    toast.error("Subject not found!");
    navigate("/subjects");
    return;
  }
  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card
        sx={{
          padding: "24px",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "24px" }}>
          {isedit ? "Edit Subject" : "Add New Subject"}
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
                name="subject_name"
                control={control}
                rules={{ required: "Subject name is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Subject Name"
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
                      label="Subject Image"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      inputProps={{ accept: "image/*" }}
                      onChange={(e) => {
                        field.onChange(e.target.files); // Do not set value, just handle the change event
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
              {isedit ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddEditSubjects;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";
import { useGetSubjectsQuery } from "../../redux/apis/subjectapi";
import {
  useEditStudyMutation,
  useGetStudyMaterialbyidQuery,
} from "../../redux/apis/studyapis";

const AddStudyMaterial = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetching subjects and study data
  const { data: subjectsData } = useGetSubjectsQuery();
  const { data: studyData, isLoading } = useGetStudyMaterialbyidQuery(id, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });

  const [editStudy] = useEditStudyMutation();

  // React Hook Form setup
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      subject_id: "",
      title: "",
      description: "",
    },
  });

  const [content, setContent] = useState("");

  // Set form values if editing
  useEffect(() => {
    if (isEdit && studyData) {
      const { subject_id, topic_name, containt } = studyData?.data;
      setValue("subject_id", subject_id);
      setValue("title", topic_name);
      setContent(containt || "");
    }
  }, [isEdit, studyData, setValue]);

  const onSubmit = async (formData) => {
    try {
      const data = {
        id,
        subject_id: formData.subject_id,
        topic_name: formData.title,
        containt: content, // QuillTextEditor HTML content
      };
      const { data: response } = await editStudy(data);
      if (response) {
        toast.success("Study material updated successfully!");
        navigate("/studys");
      }
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs
        items={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Study Material", link: "/studys" },
          { label: isEdit ? "Edit Study Material" : "Add Study Material" },
        ]}
      />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "24px" }}>
          {isEdit ? "Edit Study Material" : "Add Study Material"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Controller
                name="subject_id"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Select Subject</InputLabel>
                    <Select {...field} label="Select Subject">
                      {subjectsData?.map((subject) => (
                        <MenuItem key={subject._id} value={subject._id}>
                          {subject.subject_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Topic title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Topic Title"
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
              <Typography variant="body1">Description</Typography>
              <QuillTextEditor value={content} setContent={setContent} />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddStudyMaterial;

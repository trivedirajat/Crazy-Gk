import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography, Card } from "@mui/material";
import {
  useGetJobByIdQuery,
  useAddJobMutation,
  useEditJobMutation,
} from "../../redux/apis/jobapis";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";

const AddEditJob = ({ edit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: jobData, isError } = useGetJobByIdQuery(id, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [addJob] = useAddJobMutation();
  const [editJob] = useEditJobMutation();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      apply_date: "",
      job_link: "",
    },
  });

  useEffect(() => {
    if (edit && jobData) {
      const { title, description, apply_date, job_link } = jobData?.data;
      setValue("title", title);
      setValue("description", description);
      setValue("apply_date", apply_date);
      setValue("job_link", job_link);
    }
  }, [edit, jobData, setValue]);

  const onSubmit = async (formData) => {
    try {
      if (edit) {
        await editJob({ id, data: formData });
        toast.success("Job updated successfully!");
      } else {
        await addJob(formData);
        toast.success("Job added successfully!");
      }
      navigate("/job");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  if (isError) {
    toast.error("Job not found!");
    navigate("/job");
    return null;
  }

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Jobs", link: "/job" },
    { label: edit ? "Edit Job" : "Add New Job" },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          {edit ? "Edit Job" : "Add New Job"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Job title is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Job Title"
                size="small"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
                sx={{ mb: 2 }} // Spacing
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Job Description"
                size="small"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }} // Spacing
              />
            )}
          />
          <Controller
            name="apply_date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Apply Date"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="job_link"
            control={control}
            rules={{
              required: "Job link is required",
              pattern: {
                value: /^(https):\/\/[^ "]+$/,
                message: "Invalid URL format, must start with https://",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Job Link"
                size="small"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
                sx={{ mb: 2 }} // Spacing
              />
            )}
          />
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              {edit ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddEditJob;

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Grid, Typography, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  useGetDailyVocabByIdQuery,
  useAddDailyVocabMutation,
  useEditDailyVocabMutation,
} from "../../redux/apis/dailyvocabapis";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddEditDailyVocab = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addDailyVocab] = useAddDailyVocabMutation();
  const [editDailyVocab] = useEditDailyVocabMutation();
  const { data: dailyVocabData, isError } = useGetDailyVocabByIdQuery(id, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && dailyVocabData) {
      const { title, description } = dailyVocabData?.data;
      setValue("title", title);
      setContent(description || "");
    }
  }, [isEdit, dailyVocabData, setValue]);

  const onSubmit = async (formData) => {
    const data = {
      title: formData.title,
      description: content, // QuillTextEditor content
    };

    try {
      if (isEdit) {
        await editDailyVocab({ id, data });
        toast.success("Daily vocab updated successfully!");
      } else {
        const response = await addDailyVocab(data);
        if (response.data) {
          toast.success("Daily vocab added successfully!");
        } else if (response.error) {
          toast.error(response.error.data.message || "An error occurred!");
        }
      }
      navigate("/dailyvocab");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Daily Vocab", link: "/dailyvocab" },
    { label: isEdit ? "Edit Daily Vocab" : "Add New Daily Vocab" },
  ];

  if (isError) {
    toast.error("Daily vocab not found!");
    navigate("/dailyvocab");
    return null;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "24px" }}>
          {isEdit ? "Edit Daily Vocab" : "Add New Daily Vocab"}
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

export default AddEditDailyVocab;

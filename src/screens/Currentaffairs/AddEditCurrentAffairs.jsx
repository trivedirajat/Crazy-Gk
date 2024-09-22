import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Breadcrumbs from "component/common/Breadcrumbs";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";
import {
  useAddcurrentaffairsMutation,
  useEditcurrentaffairsMutation,
  useGetcurrentaffairsbyidQuery,
} from "../../redux/apis/currentaffairsapi";
import moment from "moment"; // Import moment

const AddEditCurrentAffairs = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addCurrentAffairs, { isLoading: isAddLoading }] =
    useAddcurrentaffairsMutation();
  const [editCurrentAffairs, { isLoading: isEditLoading }] =
    useEditcurrentaffairsMutation();
  const { data: currentAffairData, isError } = useGetcurrentaffairsbyidQuery(
    id,
    {
      skip: !isEdit,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      is_important: false,
      date: moment().format("YYYY-MM-DD"),
    },
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && currentAffairData) {
      const { title, description, is_important, date } = currentAffairData.data;
      setValue("title", title);
      setContent(description || "");
      setValue("is_important", is_important);
      setValue("date", moment(date).format("YYYY-MM-DD"));
    }
  }, [isEdit, currentAffairData, setValue]);

  const onSubmit = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        description: content,
        date: moment(formData.date).format("YYYY-MM-DD"),
      };

      if (isEdit) {
        await editCurrentAffairs({ id, data: formattedData });
        toast.success("Current affairs updated successfully!");
      } else {
        await addCurrentAffairs(formattedData);
        toast.success("Current affairs added successfully!");
      }
      navigate("/currentaffairs");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Current Affairs", link: "/currentaffairs" },
    { label: isEdit ? "Edit Current Affairs" : "Add New Current Affairs" },
  ];

  if (isError) {
    toast.error("Current affairs not found!");
    navigate("/currentaffairs");
    return;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "24px" }}>
          {isEdit ? "Edit Current Affairs" : "Add New Current Affairs"}
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

            <Grid item xs={12} md={8}>
              <Controller
                name="is_important"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Is Important"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Date"
                    type="date"
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
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

export default AddEditCurrentAffairs;

import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Card,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";
import {
  useGetvideobyidQuery,
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../redux/apis/videoapi";
import toast from "react-hot-toast";
import { useGetsubjectnameQuery } from "../../redux/apis/subjectapi";

const AddEditStudyVideo = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: subjects } = useGetsubjectnameQuery();
  const { data: videoData } = useGetvideobyidQuery(id, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [addVideo] = useAddVideoMutation();
  const [editVideo] = useEditVideoMutation();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      subject_id: "",
      title: "",
      video_url: "",
      is_trending: true,
      description: [{ title: "", content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });
  console.log("🚀 ~ AddEditStudyVideo ~ description:", watch());

  useEffect(() => {
    if (isEdit && videoData) {
      const { subject_id, title, video_url, is_trending, description } =
        videoData?.data;
      setValue("subject_id", subject_id || "");
      setValue("title", title || "");
      setValue("video_url", video_url || "");
      setValue("is_trending", is_trending || false);
      setValue("description", description || [{ title: "", content: "" }]);
    }
  }, [isEdit, videoData, setValue]);

  const onSubmit = async (formData) => {
    try {
      if (isEdit) {
        await editVideo({ id, data: formData });
        toast.success("Video updated successfully!");
      } else {
        await addVideo(formData);
        toast.success("Video added successfully!");
      }
      navigate("/studyvideo");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? "Edit Video" : "Add New Video"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="subject_id"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    fullWidth
                    size="small"
                    displayEmpty
                    defaultValue=""
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                  >
                    <MenuItem value="" disabled>
                      Select Subject
                    </MenuItem>
                    {subjects?.data?.map((subject) => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.subject_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Video Title"
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                rules={{
                  required: "Video URL is required",
                  pattern: {
                    value: /^(https:\/\/)([^\s]+)$/i,
                    message: "Please enter a valid HTTPS URL",
                  },
                }}
                name="video_url"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Video URL"
                    size="small"
                    error={!!fieldState.error}
                    fullWidth
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="is_trending"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Trending"
                  />
                )}
              />
            </Grid>

            {fields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Grid item xs={11}>
                  <Controller
                    name={`description.${index}.title`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Content Title"
                        size="small"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message || ""}
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => remove(index)}
                    color="error"
                    sx={{ width: "70%", height: "70%" }}
                  >
                    -
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name={`description.${index}.content`}
                    control={control}
                    render={({ field }) => (
                      <QuillTextEditor
                        value={field.value || ""}
                        setContent={field.onChange}
                      />
                    )}
                  />
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Button
                onClick={() => append({ title: "", content: "" })}
                variant="contained"
              >
                Add Content
              </Button>
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

export default AddEditStudyVideo;

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Autocomplete,
} from "@mui/material";
import { useGetSubjectsQuery } from "../../redux/apis/subjectapi";
import {
  useAddQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
  useLazyGetQuestionsListbySubjectidQuery,
} from "../../redux/apis/quizapi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const QuizForm = ({ initialData = {}, Isedit = false }) => {
  const { Quizid } = useParams();
  const [editQuiz] = useEditQuizMutation();
  const { data: Quize = [] } = useGetQuizQuery(
    {
      id: Quizid,
    },
    { skip: !Isedit }
  );
  const navigatpage = useNavigate();
  const [QustionsList, setQustionsList] = useState([]);
  const { data: subjects = [] } = useGetSubjectsQuery();
  const [addQuiz] = useAddQuizMutation();
  const [getQuestionsListbySubjectid] =
    useLazyGetQuestionsListbySubjectidQuery();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      questionList: initialData.questionList || [],
      subject: initialData.subject || "",
      totalMarks: initialData.totalMarks || "",
      passingMarks: initialData.passingMarks || "",
      negativeMarks: initialData.negativeMarks || "",
      isPublished: initialData.isPublished || true,
    },
  });

  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      if (type === "change" && name === "subject") {
        setValue("questionList", []);
        const selectedSubject = value.subject;
        const { data = [] } = await getQuestionsListbySubjectid({
          id: selectedSubject,
        });
        if (data?.data?.length > 0) {
          setQustionsList(data.data);
        } else {
          setQustionsList([]);
          toast.error("No questions found for this subject");
        }
      }
      if (type === "change" && name === "questionList") {
        const selectedQuestions = value.questionList;
        if (selectedQuestions.length > 0) {
          const totalMarks = selectedQuestions?.reduce((acc, curr) => {
            acc += curr?.marks;
            return acc;
          }, 0);
          setValue("totalMarks", totalMarks);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getQuestionsListbySubjectid, setValue]);
  const getquestionlist = async (selectedSubject, questionList) => {
    const { data = [] } = await getQuestionsListbySubjectid({
      id: selectedSubject,
    });
    if (data?.data?.length > 0) {
      const selectedQuestions = data.data?.filter((question) => {
        return questionList?.includes(question?._id);
      });
      setValue("questionList", selectedQuestions);
      setQustionsList(data.data);
    } else {
      setQustionsList([]);
    }
  };
  useEffect(() => {
    if (Quize?.data) {
      const {
        name,
        description,
        questionList,
        subject,
        totalMarks,
        passingMarks,
        negativeMarks,
        isPublished,
      } = Quize?.data;
      getquestionlist(subject, questionList);
      setValue("name", name);
      setValue("description", description);
      setValue("subject", subject || "");
      setValue("totalMarks", totalMarks);
      setValue("passingMarks", passingMarks);
      setValue("negativeMarks", negativeMarks);
      setValue("isPublished", isPublished);
    }
  }, [Quize, setValue]);

  const onSubmit = async (data) => {
    if (Isedit) {
      const response = await editQuiz({
        id: Quizid,
        data: data,
      });
      if (response?.data) {
        navigatpage("/quiz");
        toast.success("Quiz updated successfully");
      }
      if (response?.error) {
        toast.error("Could not update. Try again");
      }
    } else {
      const response = await addQuiz(data);
      if (response?.data) {
        navigatpage("/quiz");
        toast.success("Quiz added successfully");
      }
      if (response?.error) {
        toast.error("Could not add. Try again");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Quiz Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters long",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description.message : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              rules={{ required: "Subject is required" }}
              name="subject"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="dense" size="small">
                  <InputLabel shrink>Subject</InputLabel>
                  <Select
                    {...field}
                    label="Subject"
                    displayEmpty
                    sx={{ height: "36px" }}
                    inputProps={{ "aria-label": "Without label" }}
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
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              rules={{ required: "Questions is required" }}
              name="questionList"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disabled={QustionsList.length === 0}
                  options={QustionsList || []}
                  getOptionLabel={(option) => option.question || ""}
                  value={field.value || []}
                  onChange={(_, newValue) => {
                    const uniqueQuestions = newValue.filter(
                      (item, index, self) =>
                        index === self.findIndex((t) => t._id === item._id)
                    );
                    field.onChange(uniqueQuestions);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Questions"
                      variant="outlined"
                      size="small"
                      error={!!errors.questionList}
                      helperText={
                        errors.questionList ? errors.questionList.message : ""
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="totalMarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total Marks"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  disabled
                  error={!!errors.totalMarks}
                  helperText={
                    errors.totalMarks ? errors.totalMarks.message : ""
                  }
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <Controller
              name="passingMarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Passing Marks"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  error={!!errors.passingMarks}
                  helperText={
                    errors.passingMarks ? errors.passingMarks.message : ""
                  }
                />
              )}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={4}>
            <Controller
              name="negativeMarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Negative Marks"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  error={!!errors.negativeMarks}
                  helperText={
                    errors.negativeMarks ? errors.negativeMarks.message : ""
                  }
                />
              )}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Published"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {Isedit ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default QuizForm;

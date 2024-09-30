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
  Card,
} from "@mui/material";
import { useGetsubjectnameQuery } from "../../redux/apis/subjectapi";
import {
  useAddQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
  useLazyGetQuestionsListbySubjectidQuery,
} from "../../redux/apis/quizapi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "component/common/Breadcrumbs";

const QuizForm = ({ Isedit = false }) => {
  const { Quizid } = useParams();
  const [editQuiz] = useEditQuizMutation();
  const { data: Quize = [] } = useGetQuizQuery(
    { id: Quizid },
    { skip: !Isedit }
  );
  const navigate = useNavigate();
  const [QustionsList, setQustionsList] = useState([]);
  const { data: subjects = [] } = useGetsubjectnameQuery();
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
      name: "",
      description: "",
      questionList: [],
      subject: "",
      totalMarks: "",
      passingMarks: "",
      negativeMarks: "",
      isPublished: true,
      isFeatured: false,
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
        setQustionsList(data?.data || []);
        if (!data?.data?.length) {
          toast.error("No questions found for this subject");
        }
      }
      if (type === "change" && name === "questionList") {
        const totalMarks = value.questionList?.reduce(
          (acc, curr) => acc + (curr?.marks || 0),
          0
        );
        setValue("totalMarks", totalMarks);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getQuestionsListbySubjectid, setValue]);

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
        isFeatured,
      } = Quize.data;
      getQuestionsListbySubjectid({ id: subject }).then(({ data = [] }) => {
        setQustionsList(data.data);
        setValue(
          "questionList",
          data.data?.filter((q) => questionList?.includes(q._id))
        );
      });
      setValue("name", name);
      setValue("description", description);
      setValue("subject", subject || "");
      setValue("totalMarks", totalMarks);
      setValue("passingMarks", passingMarks);
      setValue("negativeMarks", negativeMarks);
      setValue("isPublished", isPublished);
      setValue("isFeatured", isFeatured);
    }
  }, [Quize, setValue]);

  const onSubmit = async (data) => {
    const response = Isedit
      ? await editQuiz({ id: Quizid, data })
      : await addQuiz(data);

    if (response?.data) {
      navigate("/quiz");
      toast.success(
        Isedit ? "Quiz updated successfully" : "Quiz added successfully"
      );
    } else {
      toast.error("An error occurred");
    }
  };
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Quiz", link: "/quiz" },
    { label: Isedit ? "Edit Quiz" : "Add Quiz" },
  ];
  return (
    <Box sx={{ height: "100%" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Card sx={{ padding: "24px" }}>
        <Typography variant="h6" gutterBottom sx={{ mb:2 }}>
          {Isedit ? "Edit Quiz" : "Add Quiz"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
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
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
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
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="subject"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Subject</InputLabel>
                    <Select {...field} label="Subject" error={!!errors.subject}>
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
                name="questionList"
                control={control}
                rules={{ required: "Questions are required" }}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={QustionsList || []}
                    getOptionLabel={(option) => option.question}
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
                        helperText={errors.questionList?.message}
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
                    helperText={errors.totalMarks?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Featured (Show on homepage)"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                
              >
                {Isedit ? "Update" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default QuizForm;

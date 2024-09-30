import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get id from URL
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Radio,
  RadioGroup,
  CircularProgress, // Import CircularProgress for loading state
  Alert, // Import Alert for error state
} from "@mui/material";
import { PlusCircle, MinusCircle } from "react-feather";
import { useGetsubjectnameQuery } from "../../redux/apis/subjectapi";
import {
  useEditQuestionsMutation,
  useGetquestionsbyidQuery,
} from "../../redux/apis/questionapi"; // Import the useGetQuestionsQuery hook
import toast from "react-hot-toast";

function EditQuestions() {
  const { Questionid } = useParams();
  const navigatpage = useNavigate();
  const [editQuestions] = useEditQuestionsMutation();
  const { data: subjects = [] } = useGetsubjectnameQuery();
  const {
    data: questionData = { data: [] },
    isLoading,
    isError,
  } = useGetquestionsbyidQuery(
    {
      id: Questionid,
    },
    {
      skip: !Questionid,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  const { control, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      questions: [
        {
          question: "",
          questionType: "Multiple Choice",
          options: [{ value: "", isCorrect: false }],
          marks: 1,
          time: 30,
          isPublished: true,
          subject: "",
        },
      ],
    },
  });
  useEffect(() => {
    if (questionData?.data) {
      setValue("questions.0", questionData.data);
      [questionData?.data].forEach((question, qIndex) => {
        const newType = question.questionType;
        setValue(`questions.${qIndex}.subject`, question.subject?._id);

        if (newType === "True/False") {
          const newOptions = ["True", "False"].map((value) => ({
            value,
            isCorrect: false,
          }));
          setValue(`questions.${qIndex}.options`, newOptions);
        } else if (
          newType === "Single Choice" ||
          newType === "Multiple Choice"
        ) {
          setValue(`questions.${qIndex}.options`, question.options || []);
        } else if (newType === "Fill in the Blank") {
          setValue(`questions.${qIndex}.options`, []);
        }
      });
    }
  }, [questionData?.data, setValue]);

  const { fields: questionFields } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = watch("questions");

  //   useEffect(() => {
  //     watchQuestions.forEach((question, qIndex) => {
  //       const newType = question.questionType;
  //       setValue(`questions.${qIndex}.subject`, question.subject);
  //       if (newType === "True/False") {
  //         const newOptions = ["True", "False"].map((value) => ({
  //           value,
  //           isCorrect: false,
  //         }));
  //         setValue(`questions.${qIndex}.options`, newOptions);
  //       } else if (newType === "Single Choice" || newType === "Multiple Choice") {
  //         setValue(`questions.${qIndex}.options`, question.options || []);
  //       } else if (newType === "Fill in the Blank") {
  //         setValue(`questions.${qIndex}.options`, []);
  //       }
  //     });
  //   }, [setValue, questionData, watchQuestions]);

  const handleOptionChange = (qIndex, updatedOptions) => {
    setValue(`questions.${qIndex}.options`, updatedOptions);
  };

  const onSubmit = async (data) => {
    const response = await editQuestions({
      id: Questionid,
      data: data.questions[0],
    });
    if (response.data) {
      toast.success("Quiz updated successfully");
      navigatpage("/Questions");
    }
    if (response.error) {
      toast.error(response.error.data.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !questionData) {
    return (
      <Box mt={4}>
        <Alert severity="error">Failed to load question data.</Alert>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Edit Quiz
      </Typography>

      {/* Questions */}
      {questionFields.map((question, qIndex) => (
        <Box
          key={question.id}
          sx={{
            mb: 3,
            mt: 2,
            p: 3,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #ddd",
            boxShadow: 1,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Question {qIndex + 1}
          </Typography>

          <Grid container spacing={2}>
            {/* Subject Dropdown for each question */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel shrink>Subject</InputLabel>
                <Select
                  {...register(`questions.${qIndex}.subject`, {
                    required: true,
                  })}
                  label="Subject"
                  displayEmpty
                  value={watch(`questions.${qIndex}.subject`) || ""}
                  sx={{ height: "36px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {subjects?.data ? (
                    subjects?.data.map((subject) => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.subject_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No subjects available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Question"
                {...register(`questions.${qIndex}.question`, {
                  required: true,
                })}
                fullWidth
                margin="dense"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel shrink>Question Type</InputLabel>
                <Select
                  {...register(`questions.${qIndex}.questionType`, {
                    required: true,
                  })}
                  defaultValue="Multiple Choice"
                  label="Question Type"
                  fullWidth
                  disabled
                  margin="dense"
                  size="small"
                  displayEmpty
                  sx={{ height: "36px" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Single Choice">Single Choice</MenuItem>
                  <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                  <MenuItem value="True/False">True/False</MenuItem>
                  <MenuItem value="Fill in the Blank">
                    Fill in the Blank
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Marks"
                type="number"
                {...register(`questions.${qIndex}.marks`, {
                  required: true,
                  min: 1,
                })}
                fullWidth
                margin="dense"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Time (seconds)"
                type="number"
                {...register(`questions.${qIndex}.time`, {
                  required: true,
                  min: 1,
                })}
                fullWidth
                margin="dense"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    {...register(`questions.${qIndex}.isPublished`)}
                    defaultChecked
                  />
                }
                label="Published"
              />
            </Grid>
          </Grid>

          {/* Dynamic Options based on Question Type */}
          {watchQuestions[qIndex]?.questionType !== "Fill in the Blank" && (
            <>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Options
              </Typography>
              <Controller
                control={control}
                name={`questions.${qIndex}.options`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      {watchQuestions[qIndex]?.questionType === "True/False" ? (
                        <RadioGroup
                          value={value.find((o) => o.isCorrect)?.value || ""}
                          onChange={(e) => {
                            const newOptions = [
                              {
                                value: "True",
                                isCorrect: e.target.value === "True",
                              },
                              {
                                value: "False",
                                isCorrect: e.target.value === "False",
                              },
                            ];
                            handleOptionChange(qIndex, newOptions);
                          }}
                        >
                          {["True", "False"].map((option) => (
                            <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      ) : (
                        value.map((option, optIndex) => (
                          <Box
                            key={optIndex}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <TextField
                              label={`Option ${optIndex + 1}`}
                              value={option.value}
                              onChange={(e) => {
                                const newOptions = [...value];
                                newOptions[optIndex].value = e.target.value;
                                handleOptionChange(qIndex, newOptions);
                              }}
                              fullWidth
                              margin="dense"
                              size="small"
                              sx={{ mr: 1 }}
                            />

                            <Checkbox
                              checked={option.isCorrect}
                              onChange={(e) => {
                                const newOptions = [...value];
                                newOptions[optIndex].isCorrect =
                                  e.target.checked;
                                handleOptionChange(qIndex, newOptions);
                              }}
                            />

                            {value.length > 1 && (
                              <IconButton
                                color="error"
                                onClick={() => {
                                  const newOptions = value.filter(
                                    (_, i) => i !== optIndex
                                  );
                                  handleOptionChange(qIndex, newOptions);
                                }}
                              >
                                <MinusCircle size={20} />
                              </IconButton>
                            )}
                          </Box>
                        ))
                      )}
                      {watchQuestions[qIndex]?.questionType !== "True/False" &&
                        watchQuestions[qIndex]?.questionType !==
                          "Fill in the Blank" && (
                          <Button
                            variant="outlined"
                            startIcon={<PlusCircle size={20} />}
                            onClick={() => {
                              const newOptions = [
                                ...value,
                                { value: "", isCorrect: false },
                              ];
                              handleOptionChange(qIndex, newOptions);
                            }}
                          >
                            Add Option
                          </Button>
                        )}
                    </>
                  );
                }}
              />
            </>
          )}
        </Box>
      ))}

      {/* Submit Button */}
      <Box mt={3} display="flex" justifyContent="center">
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default EditQuestions;

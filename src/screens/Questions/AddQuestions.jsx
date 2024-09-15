import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
} from "@mui/material";
import { PlusCircle, MinusCircle } from "react-feather";
import { useGetSubjectsQuery } from "../../redux/apis/subjectapi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddQuestionsMutation } from "../../redux/apis/questionapi";

function AddQuestions() {
  const navigatpage = useNavigate();
  const [addQuestions] = useAddQuestionsMutation();
  const { data: subjects = [] } = useGetSubjectsQuery(); // Ensure subjects is an array
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

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = watch("questions");

  useEffect(() => {
    watchQuestions.forEach((question, qIndex) => {
      const newType = question.questionType;

      if (newType === "True/False") {
        const newOptions = ["True", "False"].map((value) => ({
          value,
          isCorrect: false,
        }));
        setValue(`questions.${qIndex}.options`, newOptions);
      } else if (newType === "Single Choice" || newType === "Multiple Choice") {
        setValue(`questions.${qIndex}.options`, question.options || []);
      } else if (newType === "Fill in the Blank") {
        setValue(`questions.${qIndex}.options`, []);
      }
    });
  }, [watchQuestions, setValue]);

  const handleOptionChange = (qIndex, updatedOptions) => {
    setValue(`questions.${qIndex}.options`, updatedOptions);
  };

  const validateQuestions = (questions) => {
    return questions.every((question) => {
      if (question.questionType === "Fill in the Blank") return true;
      return question.options.some((option) => option.isCorrect);
    });
  };

  const onSubmit = async (data) => {
    if (!validateQuestions(data.questions)) {
      toast.error("Each question must have at least one correct option.");
      return;
    }

    const response = addQuestions(data);
    navigatpage(`/Questions`);
    toast.promise(response, {
      loading: "Adding...",
      success: <b>Question added successfully</b>,
      error: <b>Could not add. Try again</b>,
    });
  };

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
        Create Quiz
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
                      ) : watchQuestions[qIndex]?.questionType ===
                        "Single Choice" ? (
                        <>
                          <RadioGroup
                            value={value.find((o) => o.isCorrect)?.value || ""}
                            onChange={(e) => {
                              const newOptions = value.map((o) => ({
                                ...o,
                                isCorrect: o.value === e.target.value,
                              }));
                              handleOptionChange(qIndex, newOptions);
                            }}
                          >
                            {value.map((option, oIndex) => (
                              <Grid
                                container
                                spacing={1}
                                alignItems="center"
                                key={oIndex}
                              >
                                <Grid item xs>
                                  <TextField
                                    label={`Option ${oIndex + 1}`}
                                    value={option.value}
                                    onChange={(e) => {
                                      const newOptions = [...value];
                                      newOptions[oIndex].value = e.target.value;
                                      handleOptionChange(qIndex, newOptions);
                                    }}
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                  />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel
                                    value={option.value}
                                    control={
                                      <Radio
                                        checked={option.isCorrect}
                                        onChange={(e) => {
                                          const newOptions = value.map((o) => ({
                                            ...o,
                                            isCorrect:
                                              o.value === e.target.value,
                                          }));
                                          handleOptionChange(
                                            qIndex,
                                            newOptions
                                          );
                                        }}
                                      />
                                    }
                                    label="Correct"
                                  />
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    color="error"
                                    onClick={() =>
                                      handleOptionChange(
                                        qIndex,
                                        value.filter(
                                          (_, index) => index !== oIndex
                                        )
                                      )
                                    }
                                  >
                                    <MinusCircle />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            ))}
                          </RadioGroup>
                          <Button
                            onClick={() =>
                              handleOptionChange(qIndex, [
                                ...value,
                                { value: "", isCorrect: false },
                              ])
                            }
                            variant="outlined"
                            color="primary"
                            startIcon={<PlusCircle />}
                          >
                            Add Option
                          </Button>
                        </>
                      ) : (
                        <>
                          {value.map((option, oIndex) => (
                            <Grid
                              container
                              spacing={1}
                              alignItems="center"
                              key={oIndex}
                            >
                              <Grid item xs>
                                <TextField
                                  label={`Option ${oIndex + 1}`}
                                  value={option.value}
                                  onChange={(e) => {
                                    const newOptions = [...value];
                                    newOptions[oIndex].value = e.target.value;
                                    handleOptionChange(qIndex, newOptions);
                                  }}
                                  fullWidth
                                  margin="dense"
                                  size="small"
                                />
                              </Grid>
                              <Grid item>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={option.isCorrect}
                                      onChange={(e) => {
                                        const newOptions = [...value];
                                        newOptions[oIndex].isCorrect =
                                          e.target.checked;
                                        handleOptionChange(qIndex, newOptions);
                                      }}
                                    />
                                  }
                                  label="Correct"
                                />
                              </Grid>
                              <Grid item>
                                <IconButton
                                  color="error"
                                  onClick={() =>
                                    handleOptionChange(
                                      qIndex,
                                      value.filter(
                                        (_, index) => index !== oIndex
                                      )
                                    )
                                  }
                                >
                                  <MinusCircle />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            onClick={() =>
                              handleOptionChange(qIndex, [
                                ...value,
                                { value: "", isCorrect: false },
                              ])
                            }
                            variant="outlined"
                            color="primary"
                            startIcon={<PlusCircle />}
                          >
                            Add Option
                          </Button>
                        </>
                      )}
                    </>
                  );
                }}
              />
            </>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              onClick={() => removeQuestion(qIndex)}
              variant="outlined"
              color="error"
              startIcon={<MinusCircle />}
            >
              Remove Question
            </Button>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() =>
            appendQuestion({
              question: "",
              questionType: "Multiple Choice",
              options: [{ value: "", isCorrect: false }],
              marks: 1,
              time: 30,
              isPublished: true,
              subjectId: "",
            })
          }
          variant="outlined"
          color="primary"
          startIcon={<PlusCircle />}
        >
          Add Question
        </Button>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default AddQuestions;

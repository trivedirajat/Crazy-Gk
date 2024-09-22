import React from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "../../redux/apis/authapi";
import { jwtconfig } from "utils/Global";
import { useNavigate } from "react-router-dom";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await login({ user_type: "admin", ...data }).unwrap();
      if (response?.status === 200) {
        const { accessToken, refreshToken, user } = response.data;
        localStorage.setItem(jwtconfig.accessTokenStorageKey, accessToken);
        localStorage.setItem(jwtconfig.refreshTokenStoragekey, refreshToken);
        localStorage.setItem(jwtconfig.user, JSON.stringify(user));
        navigate("/dashboard");
        toast.success("Logged in successfully!");
      }
      console.log("Login Response: ", response);
    } catch (error) {
      toast.error(error?.data?.message || "Login failed!");
      console.error("Login Error: ", error);
    }
  };
  // Handle errors
  const onError = (errors) => {
    toast.error("Please fill in the required fields.");
    console.log("Errors: ", watch());
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              Email
            </Typography>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Box>

          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          </Box>

          {/* <Stack
            justifyContent="end"
            direction="row"
            alignItems="center"
            my={2}
          >
            <Typography
              fontWeight="500"
              sx={{ textDecoration: "none", color: "primary.main" }}
            >
              Forgot Password?
            </Typography>
          </Stack> */}
        </Stack>

        <Box mt="25px">
          <Button
            disabled={isLoading}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;

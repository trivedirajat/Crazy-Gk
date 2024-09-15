// src/LoginPage.jsx
import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 400px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;

const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  background-color: #1976d2;
  color: white;

  &:hover {
    background-color: #155a9e;
  }
`;

const LoginPage = () => {
  return (
    <Container>
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <FormWrapper>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            required
          />
          <StyledButton variant="contained" fullWidth>
            Sign In
          </StyledButton>
        </FormWrapper>
      </StyledPaper>
    </Container>
  );
};

export default LoginPage;

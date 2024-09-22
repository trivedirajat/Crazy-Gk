import { createTheme } from "@mui/material/styles";
import typography from "./typography";

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#04aa50", // Primary color
      contrastText: "#ffffff", // Text color on primary elements
    },
    secondary: {
      main: "#028843", // A darker green to complement the primary color
      contrastText: "#ffffff",
    },
    success: {
      main: "#66bb6a", // A light green for success notifications or actions
    },
    error: {
      main: "#f44336", // A strong red for error messages
    },
    warning: {
      main: "#ff9800", // An orange for warnings
    },
    info: {
      main: "#29b6f6", // A light blue for informational messages
    },
    background: {
      default: "#f4f4f4", // Light gray background
      paper: "#ffffff", // White background for paper components
    },
    text: {
      primary: "#333333", // Dark text color for general use
      secondary: "#666666", // Gray text for secondary information
    },
    primaryLight: {
      main: "#dbf8e1",
      contrastText: "#333333",
    },
  },

  typography,
});

export { baselightTheme };

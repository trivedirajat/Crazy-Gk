// SweetAlertDialog.jsx
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const SweetAlertDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 2, // Larger border radius
    padding: theme.spacing(4),
    boxShadow: theme.shadows[10],
    maxWidth: 500, // Limit the width
  },
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  borderRadius: `${theme.shape.borderRadius * 2}px ${
    theme.shape.borderRadius * 2
  }px 0 0`,
  color: theme.palette.error.main,
  padding: theme.spacing(2),
  textAlign: "center",
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
}));

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: "center", // Center the buttons
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 2),
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

const SweetAlertDialogComponent = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "primary",
  cancelButtonColor = "secondary",
  disableConfirmButton = false,
}) => {
  return (
    <SweetAlertDialog open={open} onClose={onClose}>
      <DialogTitleStyled>{title}</DialogTitleStyled>
      <DialogContentStyled>
        <Typography variant="body1">{content}</Typography>
      </DialogContentStyled>
      <DialogActionsStyled>
        <ButtonStyled
          onClick={onClose}
          color={cancelButtonColor}
          variant="outlined"
        >
          {cancelText}
        </ButtonStyled>
        <ButtonStyled
          onClick={onConfirm}
          color={confirmButtonColor}
          variant="contained"
          disabled={disableConfirmButton}
        >
          {confirmText}
        </ButtonStyled>
      </DialogActionsStyled>
    </SweetAlertDialog>
  );
};

SweetAlertDialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  disableConfirmButton: PropTypes.bool,
};

export default SweetAlertDialogComponent;

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

const ViewUserDialog = ({ open, user, onClose }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {user.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Mobile:</strong> {user.mobile}
          </Typography>
          <Typography variant="body1">
            <strong>User Type:</strong> {user.user_type}
          </Typography>
          <Typography variant="body1">
            <strong>Verified:</strong> {user.verified ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <strong>Created Date:</strong>{" "}
            {new Date(user.createdDate).toLocaleString()}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog;

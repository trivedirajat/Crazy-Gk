import { useState } from "react";
import {
  Box,
  IconButton,
  CircularProgress,
  Card,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconTrash, IconEye } from "@tabler/icons-react";
import toast from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/apis/userapi";
import Breadcrumbs from "component/common/Breadcrumbs";
import ConfirmDialog from "component/common/ConfirmDialog";
import ViewUserDialog from "./ViewUserDialog";

const UserTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { data: usersData, isLoading } = useGetUsersQuery({
    page: paginationModel.page + 1, // Adjusting for 0-index
    limit: paginationModel.pageSize,
  });
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteUser(selectedId).unwrap();
        toast.success("User deleted successfully");
        setOpenDeleteDialog(false);
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row?.name || "-"
        }`}</Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row?.email || "-"
        }`}</Typography>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row?.gender || "-"
        }`}</Typography>
      ),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 200,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row?.mobile || "-"
        }`}</Typography>
      ),
    },
    {
      field: "user_type",
      headerName: "User Type",
      width: 100,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row?.user_type || "-"
        }`}</Typography>
      ),
    },
    {
      field: "verified",
      headerName: "Verified",
      width: 100,
      type: "boolean",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setSelectedUser(params.row);
              setOpenViewDialog(true);
            }}
          >
            <IconEye title="View User" />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedId(params.row._id);
              setOpenDeleteDialog(true);
            }}
          >
            <IconTrash title="Delete User" />
          </IconButton>
        </>
      ),
    },
  ];

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "All Users" },
  ];

  return (
    <Box>
      <Breadcrumbs items={breadcrumbItems} />

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ minHeight: "70vh", }}>
          <DataGrid
            autoHeight
            rows={usersData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            rowCount={usersData?.total_data || 0}
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={setPaginationModel}
            localeText={{ noRowsLabel: "No Record(s) Found" }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                color: "#000",
                fontWeight: "bold",
                fontSize: "16px",
              },

              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </Card>
      )}

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete User"
        content="Are you sure you want to delete this user?"
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      />

      <ViewUserDialog
        open={openViewDialog}
        user={selectedUser}
        onClose={() => setOpenViewDialog(false)}
      />
    </Box>
  );
};

export default UserTable;

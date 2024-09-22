import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import {
  useDeleteVideoMutation,
  useGetAllVideoQuery,
} from "../../redux/apis/videoapi";
import ConfirmDialog from "component/common/ConfirmDialog";
import Breadcrumbs from "component/common/Breadcrumbs";

const StudyVideoList = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: videoData, isLoading } = useGetAllVideoQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteVideo] = useDeleteVideoMutation();

  const handleEdit = (id) => {
    navigate(`/editstudyvideo/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteVideo(selectedId).unwrap();
        toast.success("Study video deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the study video");
      }
    }
  };

  const openDeleteConfirmation = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Study Videos" },
  ];

  const columns = [
    {
      field: "is_trending",
      headerName: "Trending",
      flex: 1,
      renderCell: ({ row }) => (
        <input type="checkbox" checked={row.is_trending} readOnly />
      ),
    },
    {
      field: "subject_name",
      headerName: "Subject",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.subject_id?.subject_name || "-"}
        </Typography>
      ),
    },
    {
      field: "title",
      headerName: "Video Title",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.title || "-"}
        </Typography>
      ),
    },
    {
      field: "video_url",
      headerName: "Video URL",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.video_url || "-"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row._id)}
          >
            <IconPencil />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmation(params.row._id)}
          >
            <IconTrash />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addnewstudyvideo")}
      >
        Add New Study Video
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={videoData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            rowCount={videoData?.total_data || 0}
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={setPaginationModel}
            localeText={{ noRowsLabel: "No Record(s) Found" }}
            loading={isLoading}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                color: "#000",
                fontWeight: "bold",
                fontSize: "16px",
              },
              "& .MuiDataGrid-columnHeader": {
                borderBottom: "2px solid #04aa50",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </Card>
      </Box>

      <ConfirmDialog
        open={openDialog}
        title="Remove Study Video"
        content="Are you sure you want to remove this study video?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default StudyVideoList;

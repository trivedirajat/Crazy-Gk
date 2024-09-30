import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import {
  useDeleteStudyMutation,
  useGetStudyQuery,
} from "../../redux/apis/studyapis";
import { stripHtmlTags } from "utils/stripHtmlTags";
import ConfirmDialog from "component/common/ConfirmDialog";
import Breadcrumbs from "component/common/Breadcrumbs";

const Study = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: studyData, isLoading } = useGetStudyQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteStudy] = useDeleteStudyMutation();

  const handleEdit = (id) => {
    navigate(`/editStudys/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteStudy(selectedId).unwrap();
        toast.success("Study material deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the study material");
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
    { label: "Study Materials" },
  ];

  const columns = [
    {
      field: "subject_name",
      headerName: "Subject",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row.subject_id?.subject_name || "-"
        }`}</Typography>
      ),
    },
    {
      field: "topic_name",
      headerName: "Topics",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row.topic_name || "-"
        }`}</Typography>
      ),
    },
    {
      field: "sortContent",
      headerName: "Content",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          stripHtmlTags(row.sortContent) || "-"
        }`}</Typography>
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
            onClick={() => handleEdit(params?.row?._id)}
          >
            <IconPencil />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmation(params?.row?._id)}
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
        onClick={() => navigate("/addnewstudy")}
      >
        Add New Study Materials
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={studyData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            rowCount={studyData?.total_data || 0}
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
        title="Remove Study Material"
        content="Are you sure you want to remove this study material?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Study;

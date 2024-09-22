import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

import Breadcrumbs from "component/common/Breadcrumbs";
import ConfirmDialog from "component/common/ConfirmDialog";
import { stripHtmlTags } from "utils/stripHtmlTags";
import {
  useDeletecurrentaffairsMutation,
  useGetcurrentaffairsQuery,
} from "../../redux/apis/currentaffairsapi";

const CurrentAffairsList = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: affairsData, isLoading } = useGetcurrentaffairsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteCurrentAffairs] = useDeletecurrentaffairsMutation();

  const handleEdit = (id) => {
    navigate(`/editcurrentaffairs/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteCurrentAffairs(selectedId).unwrap();
        toast.success("Current affairs deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the current affairs");
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
    { label: "Current Affairs" },
  ];

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          row.title || "-"
        }`}</Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{`${
          stripHtmlTags(row.description) || "-"
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
      {/* Breadcrumbs Section */}
      <Breadcrumbs items={breadcrumbItems} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addnewcurrentaffairs")}
      >
        Add New Current Affairs
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={affairsData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            rowCount={affairsData?.total_data || 0}
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
        title="Remove Current Affairs"
        content="Are you sure you want to remove this current affair?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default CurrentAffairsList;

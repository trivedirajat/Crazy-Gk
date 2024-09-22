import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import {
  useGetebooksQuery,
  useDeleteebooksMutation,
} from "../../redux/apis/ebooksapis";
import ConfirmDialog from "component/common/ConfirmDialog";
import Breadcrumbs from "component/common/Breadcrumbs";

const EBook = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: ebookData, isLoading } = useGetebooksQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteEBook] = useDeleteebooksMutation();

  const handleEdit = (id) => {
    navigate(`/editEBook/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteEBook(selectedId).unwrap();
        toast.success("E-Book deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the E-Book");
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
    { label: "E-Books" },
  ];

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: ({ row }) => (
        <img src={row.image} alt="E-Book" style={{ width: "50px" }} />
      ),
    },
    {
      field: "pdf_link",
      headerName: "PDF Link",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{row.pdf_link}</Typography>
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
        onClick={() => navigate("/addebook")}
      >
        Add New E-Book
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={ebookData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            rowCount={ebookData?.total_data || 0}
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
        title="Remove E-Book"
        content="Are you sure you want to remove this E-Book?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default EBook;

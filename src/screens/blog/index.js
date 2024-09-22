import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

import ConfirmDialog from "component/common/ConfirmDialog";
import { stripHtmlTags } from "utils/stripHtmlTags";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
} from "../../redux/apis/blogapis";
import Breadcrumbs from "component/common/Breadcrumbs";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: blogsData, isLoading } = useGetBlogQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteBlog] = useDeleteBlogMutation();

  const handleEdit = (id) => {
    navigate(`/editblog/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteBlog(selectedId).unwrap();
        toast.success("Blog deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the blog");
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

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.title || "-"}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {stripHtmlTags(row.description) || "-"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            {console.log(params.row)}
            <IconPencil />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmation(params.row.id)}
          >
            <IconTrash />
          </IconButton>
        </>
      ),
    },
  ];

  const rows =
    blogsData?.data.map((blog) => ({
      id: blog._id,
      title: blog.title,
      description: blog.description,
    })) || [];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Blog" },
  ];
  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addblog")}
      >
        Add New Blog
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            pagination
            paginationMode="server"
            rowCount={blogsData?.total_data || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            localeText={{ noRowsLabel: "No Record(s) Found" }}
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
        title="Remove Blog"
        content="Are you sure you want to remove this blog?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Blog;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteBlogs,
  fetchBlogs,
  getBlogsError,
  getBlogsStatus,
  selectAllBlogs,
} from "../../redux/Slices/BlogSlice";
import { DataGrid } from "@mui/x-data-grid";
import { stripHtmlTags } from "../../utils/stripHtmlTags";

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allBlogs = useSelector(selectAllBlogs);
  const status = useSelector(getBlogsStatus);
  const error = useSelector(getBlogsError);
  const [selectedId, setSelectedId] = useState("");

  const navigatpage = async (navname) => {
    navigate(navname);
  };

  useEffect(() => {
    dispatch(
      fetchBlogs({
        limit: 200,
        offset: 0,
      })
    );
  }, [navigate]);

  useEffect(() => {
    if (status === "deleteSucceeded") {
      dispatch(
        fetchBlogs({
          limit: 200,
          offset: 0,
        })
      );
    }
  }, [status, error]);

  const deleteBlog = (e, id) => {
    dispatch(
      deleteBlogs({
        blog_id: id,
      })
    );
    setSelectedId("");
  };

  // Columns configuration for DataGrid
  const columns = [
    { field: "title", headerName: "Title", flex: 0.33 },
    {
      field: "description",
      headerName: "Description",
      flex: 0.88,
      renderCell: (params) => stripHtmlTags(params.value),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.11,
      renderCell: (params) => (
        <>
          <i
            className="fa fa-edit theme-fa-icon mr-3"
            aria-hidden="true"
            title="Edit Blog"
            onClick={() =>
              navigate(`/addEditblogs`, { state: { id: params.row._id } })
            }
          ></i>
          <i
            className="fa fa-trash theme-fa-icon"
            aria-hidden="true"
            title="Delete Blog"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => setSelectedId(params.row._id)}
          ></i>
        </>
      ),
    },
  ];

  // Rows data for DataGrid
  const rows = allBlogs.map((blog) => ({
    id: blog._id,
    title: blog.title,
    description: blog.description,
    _id: blog._id,
  }));

  return (
    <div className="page-body">
      {/* Modal_start */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Remove Blog
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="text-center">
                <h6>Are You Sure?</h6>
              </p>
              <p className="text-center">
                <h6>Remove This Blog</h6>
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                className="btn btn-success mr-5"
                type="button"
                data-dismiss="modal"
                onClick={(e) => deleteBlog(e, selectedId)}
              >
                Yes
              </button>
              <button
                className="btn btn-primary"
                type="button"
                data-dismiss="modal"
                onClick={() => setSelectedId("")}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal_end */}

      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>All Blog</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i
                        className="fa fa-home theme-fa-icon"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active">All Blog Listing</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div className="row pt-3">
              <div className="col-md-6">
                <div className="form-group">
                  <button
                    className="btn btn-color"
                    onClick={() => navigatpage("/addEditblogs")}
                  >
                    Add New Blog
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h5>List of Blogs:</h5>
                  </div>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection={false}
                    rowSelection={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

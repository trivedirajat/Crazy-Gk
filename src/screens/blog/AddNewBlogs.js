import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogs,
  getBlogsStatus,
  selectedBlogsWithId,
} from "../../redux/Slices/BlogSlice";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddBlogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState("");
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const status = useSelector(getBlogsStatus);
  const selectedBlog = useSelector((state) =>
    selectedBlogsWithId(state, id !== undefined ? id : 0)
  );

  const [blogData, setBlogData] = useState({
    image: "",
    title: "",
    description: "",
  });

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/blog");
    }

    return () => {};
  }, [status]);

  useEffect(() => {
    if (id !== undefined) {
      setContent(selectedBlog[0]?.description);
      setBlogData({
        image: selectedBlog[0]?.image ?? "",
        title: selectedBlog[0]?.title ?? "",
        description: selectedBlog[0]?.description ?? "",
      });
    }

    return () => {};
  }, [id]);

  const handleValueChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

      setBlogData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setBlogData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (id !== undefined) {
      formData.append("blog_id", id);
    }
    formData.append("image", blogData.image);
    formData.append("title", blogData.title);
    formData.append("description", content);
    formData.append("subject_id", "65f6888363789ad462004026");
    dispatch(addBlogs(formData));
  };

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New Blog</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/blog");
                    }}
                  >
                    All Blog Listing
                  </li>
                  <li class="breadcrumb-item active">Add New Blog</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row ">
          <div class="col-sm-12 ">
            <div class="card">
              <div class="card-header">
                <h5>Add New Blog</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Blog Image
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="file"
                          placeholder="Blog image"
                          name="image"
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Blog Title
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Blog Title"
                          name="title"
                          value={blogData?.title}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="description">Blog Description</label>
                        <QuillTextEditor
                          id="description"
                          value={content}
                          style={{
                            margin: 0,
                            padding: 0,
                            height: "100%",
                          }}
                          setContent={(content) => {
                            setContent(content);
                          }}
                        />
                        {/* <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={blogData?.description}
                          onChange={(e) => handleValueChange(e)}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button
                        className="btn btn-color"
                        type="submit"
                        onClick={(e) => {
                          addBlog(e);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddBlogs;

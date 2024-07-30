import React from "react";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const navigate = useNavigate();

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Edit Blog</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/Blog");
                    }}
                  > 
                  Edit Blog Listing
                  </li>
                  <li class="breadcrumb-item active">Edit Blog</li>
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
                <h5>Edit Blog</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row ">
                    <div class="col-md-8 ">
                      <div class="form-group">
                        <label for="exampleFormControlFirstName">
                        Subject
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlFirstName"
                          type="text"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                        Topics
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Topics"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlInput1">
                        Subject Title
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlInput1"
                          type="text"
                          placeholder="Subject Title"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleInputMobileNo">Subject Description</label>
                        <input
                          class="form-control"
                          id="exampleInputMobileNo"
                          type="text"
                          placeholder="Subject Description"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleInputMobileNo">Type</label>
                        <input
                          class="form-control"
                          id="exampleInputMobileNo"
                          type="text"
                          placeholder="Type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <div className="card-footer float-right">
                      <button className="btn btn-color" type="submit" onClick={()=>{navigatpage("/user")}}>
                        Update
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
export default EditBlog;

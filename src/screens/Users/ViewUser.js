import React from "react";
import { useNavigate } from "react-router-dom";

const ViewUser = () => {
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
                <h3>User</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/user");
                    }}
                  >
                    User Listing
                  </li>
                  {/* <li class="breadcrumb-item " onClick={() => { navigatpage("/addnewuser") }}>Add New User</li> */}
                  <li class="breadcrumb-item active">View User Details</li>
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
                <h5>Property Details</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  
                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                    <label for="exampleInputMobileNo">First Name :</label>
                    </div>

                    <div class="col-md-7 align-items-center ">
                    <label for="exampleInputMobileNo" className="boldText">suyash</label>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                    <label for="exampleInputMobileNo">Last Name :</label>
                    </div>

                    <div class="col-md-7 align-items-center ">
                      <label for="exampleInputMobileNo" className="boldText">
                        upadhyay
                      </label>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                    <label for="exampleInputMobileNo">Email address :</label>
                    </div>
                    <div class="col-md-7 align-items-center ">
                    <label for="exampleInputMobileNo" className="boldText">suyash@gmail.com</label>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                    <label for="exampleInputMobileNo">Mobile No :</label>
                    </div>
                    <div class="col-md-7 align-items-center ">
                    <label for="exampleInputMobileNo" className="boldText">0987654321</label>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                    <label for="exampleInputMobileNo">Gender :</label>
                    </div>
                    <div class="col-md-7 align-items-center ">
                      <label for="exampleInputMobileNo" className="boldText">
                        Male
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                      <label for="exampleInputMobileNo">Age :</label>
                    </div>
                    <div class="col-md-7 align-items-center ">
                      <label for="exampleInputMobileNo" className="boldText">
                        20
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-md-3 align-items-center ">
                      <label for="exampleInputMobileNo">Role :</label>
                    </div>
                    <div class="col-md-7 align-items-center ">
                      <label for="exampleInputMobileNo" className="boldText">
                        Luxury Multi
                      </label>
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
export default ViewUser;

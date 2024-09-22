import React from "react";
import { useNavigate } from "react-router-dom";

const UserListing = () => {
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
                  <li class="breadcrumb-item active">Add New User</li>
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
                <h5>Add New User</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row ">
                    <div class="col-md-8 ">
                      <div class="form-group">
                        <label for="exampleFormControlFirstName">
                          First Name
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlFirstName"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Last Name
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlInput1">
                          Email address
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlInput1"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleInputMobileNo">Mobile No</label>
                        <input
                          class="form-control"
                          id="exampleInputMobileNo"
                          type="number"
                          placeholder="Mobile No"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row pb-3">
                    <div class="row pl-4">
                      <label for="exampleInputMobileNo " className="pr-2">
                        Gender
                      </label>
                      <div class="form-check pr-2">
                        <input
                          class="form-check-input "
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Male
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleInputMobileNo">DOB</label>
                        <input
                          class="form-control"
                          id="exampleInputMobileNo"
                          type="date"
                          placeholder="DOB"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlSelect9">Role</label>
                        <select
                          class="form-control digits"
                          id="exampleFormControlSelect9"
                        >
                          <option>Luxury Multi</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button className="btn btn-color" type="submit" onClick={()=>{navigatpage("/user")}}>
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
export default UserListing;

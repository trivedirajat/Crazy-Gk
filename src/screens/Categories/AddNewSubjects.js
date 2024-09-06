import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubjects,
  getsubjectStatus,
  selectedSubjectWithId,
  addEditResponse,
} from "../../redux/Slices/SubjectSlice";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const SubjectsListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const status = useSelector(getsubjectStatus);
  const error = useSelector(addEditResponse);
  console.log("🚀 ~ SubjectsListing ~ status:", status);
  const selectedSubject = useSelector((state) =>
    selectedSubjectWithId(state, id !== undefined ? id : 0)
  );
  const [subjectData, setSubjectData] = useState({
    image: "",
    subject_name: "",
    description: "",
  });
  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/subjects");
    }

    return () => {};
  }, [status]);
  useEffect(() => {
    console.log("🚀 ~ SubjectsListing ~ error:", error);
    return () => {};
  }, [error]);
  useEffect(() => {
    if (id !== undefined) {
      setSubjectData({
        image: selectedSubject[0]?.image ?? "",
        title: selectedSubject[0]?.subject_name ?? "",
        description: selectedSubject[0]?.description ?? "",
      });
    }

    return () => {};
  }, [id]);

  // const handleValueChange = (event) => {
  //   const { name, value, type } = event.target;

  //   if (type === 'file') {
  //     const file = event.target.files[0];

  //     setSubjectData(prevState => ({
  //       ...prevState,
  //       [name]: file
  //     }));
  //   } else {
  //     setSubjectData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // }
  const handleValueChange = (event) => {
    const { name, value } = event.target;

    setSubjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addSubject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", subjectData.image);
    formData.append("subject_name", subjectData.subject_name);
    formData.append("description", content);
    dispatch(addSubjects(formData));
  };

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>subjects</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/subjects");
                    }}
                  >
                    Subject Listing
                  </li>
                  <li className="breadcrumb-item active">Add New Subjects</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-12 ">
            <div className="card">
              <div className="card-header">
                <h5>Add New Subjects</h5>
              </div>
              <form className="form theme-form">
                <div className="card-body">
                  <div className="row ">
                    <div className="col-md-8 ">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlFirstName">
                          Image
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlFirstName"
                          type="file"
                          placeholder="Image"
                          name="image"
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-8 ">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlFirstName">
                          Title
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlFirstName"
                          type="text"
                          placeholder="Title"
                          name="subject_name"
                          // value={subjectData?.title}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlLastName">
                          Description
                        </label>
                        <QuillTextEditor
                          id="exampleFormControlLastName"
                          value={content}
                          setContent={(newContent) => setContent(newContent)}
                          style={{ padding: "0" }}
                        />
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
                          addSubject(e);
                        }}
                      >
                        Add
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
export default SubjectsListing;

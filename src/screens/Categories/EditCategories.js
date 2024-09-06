import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addSubjects,
  getsubjectStatus,
  selectedSubjectWithId,
} from "../../redux/Slices/SubjectSlice";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const EditCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const subject = useSelector((state) => selectedSubjectWithId(state, id));
  const [content, setContent] = useState(subject[0]?.description || "");
  const status = useSelector(getsubjectStatus);

  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/subjects");
    }

    return () => {};
  }, [status]);

  const [subjectData, setSubjectData] = useState({
    id: subject[0]?._id ?? "",
    image: subject[0]?.image ?? "",
    subject_name: subject[0]?.subject_name ?? "",
    description: subject[0]?.description ?? "",
  });

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  const handleValueChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

      setSubjectData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setSubjectData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const editSubject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject_id", subjectData.id);
    formData.append("image", subjectData.image);
    formData.append("subject_name", subjectData.subject_name);
    formData.append("description", content);
    dispatch(addSubjects(formData));
    // navigatpage("/subjects")
  };
  console.log("subjectData", subject);

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>Subject</h3>
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
                  <li className="breadcrumb-item active">Edit Subject</li>
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
                <h5>Edit Subject</h5>
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
                          value={subjectData.subject_name}
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
                          editSubject(e);
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
export default EditCategories;

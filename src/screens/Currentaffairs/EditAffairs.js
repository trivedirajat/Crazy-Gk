import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideNav";
import Footer from "../../component/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSubjects,
  selectAllsubject,
} from "../../redux/Slices/SubjectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addCureentAffairs,
  getCurrentAffairsStatus,
  selectedCurrentAffairsWithId,
} from "../../redux/Slices/CurrentAffairsSlice";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const EditCurrentAffairs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedAffair = useSelector((state) =>
    selectedCurrentAffairsWithId(state, id)
  );
  const [content, setContent] = useState(selectedAffair[0]?.description || "");
  const allSubjects = useSelector(selectAllsubject);
  const status = useSelector(getCurrentAffairsStatus);
  console.log("selectedAffair", selectedAffair);
  const [affairTopicContent, setAffairTopicContent] = useState([
    {
      title: "",
      description: "",
    },
  ]);
  const [affairData, setAffairData] = useState({
    subject_id: "",
    title: selectedAffair[0]?.title ?? "",
    description: selectedAffair[0]?.description ?? "",
  });

  useEffect(() => {
    dispatch(
      fetchSubjects({
        limit: 200,
        offset: 0,
      })
    );
  }, [navigate]);
  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/currentaffairs");
    }

    return () => {};
  }, [status]);

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setAffairData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addVideoField = () => {
    setAffairTopicContent([
      ...affairTopicContent,
      { title: "", description: "" },
    ]);
  };

  const removeVideoField = (index) => {
    const updatedContent = [...affairTopicContent];
    updatedContent.splice(index, 1);
    setAffairTopicContent(updatedContent);
  };

  const handleValueChangeContent = (index, field, value) => {
    const updatedContent = [...affairTopicContent];
    updatedContent[index][field] = value;
    setAffairTopicContent(updatedContent);
  };

  const EditAffair = (e) => {
    e.preventDefault();
    dispatch(
      addCureentAffairs({
        currentAffairs_id: id,
        title: affairData?.title ?? "",
        description: content ?? "",
      })
    );
  };

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New Current Affairs</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/currentaffairs");
                    }}
                  >
                    All Current Affairs Listing
                  </li>
                  <li class="breadcrumb-item active">
                    Add New Current Affairs
                  </li>
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
                <h5>Add New Current Affairs</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  {/* Subject Dropdown */}
                  {/* <div class="row ">
                    <div class="col-md-8">
                      <span className="cardText">Subject dropdown</span>
                      <select
                        class="form-control btn-square"
                        id="formcontrol-select1"
                        name="subject_id"
                        // value={studyData.subject_id}
                        // onChange={(e) => handleValueChange(e)}
                      >
                        <option value={''}>Select Subject</option>
                        {allSubjects && allSubjects.map((item) => (
                          <option value={item._id}>{item?.subject_name}</option>

                        ))}
                      </select>
                    </div>
                  </div> */}
                  {/* Topic Image */}
                  {/* <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Topic Image
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="file"
                          placeholder="Topic Image"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Topic Title
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Title"
                          name="title"
                          value={affairData.title}
                          onChange={(val) => handleValueChange(val)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
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
                  {/* Multip[le title and description] */}
                  {/* <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Topic Description
                        </label>
                        {affairTopicContent && affairTopicContent.map((item, index) => (
                          <div className="row">
                            <div className="col-md-8">
                              <div className="form-group">
                                <div>
                                  <input
                                    className="form-control"
                                    id="videoTitle"
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={item.title}
                                    onChange={(e) => handleValueChangeContent(index, 'title', e.target.value)}
                                  />
                                  <input
                                    className="form-control"
                                    id="videoTitle"
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleValueChangeContent(index, 'description', e.target.value)}
                                  />
                                </div>

                              </div>
                            </div>
                            <div className="col-md-4">
                              {index === 0 ? (
                                <button type="button" className="btn btn-success" onClick={addVideoField}>+</button>
                              ) : (
                                <>
                                  <button type="button" className="btn btn-success" onClick={addVideoField}>+</button>
                                  <button type="button" className="btn btn-danger" onClick={() => removeVideoField(index)}>-</button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button
                        className="btn btn-color"
                        type="submit"
                        onClick={(e) => {
                          EditAffair(e);
                        }}
                      >
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
export default EditCurrentAffairs;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSubjects,
  selectAllsubject,
} from "../../redux/Slices/SubjectSlice";
import { useDispatch, useSelector } from "react-redux";

import "../../App.css";
import QuillTextEditor from "./QuillTextEditor";
import {
  useEditStudyMutation,
  useGetStudymaterialQuery,
} from "../../redux/apis/studyapis";
import { stripHtmlTags } from "utils/stripHtmlTags";
import toast from "react-hot-toast";

const AddStudysMaterial = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetStudymaterialQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );
  const [editStudy] = useEditStudyMutation();
  const allSubjects = useSelector(selectAllsubject);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [studyData, setStudyData] = useState({
    subject_id: "",
    title: "",
    description: {
      title: "",
      description: "",
    },
  });

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setStudyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(
      fetchSubjects({
        limit: 200,
        offset: 0,
      })
    );
  }, []);
  useEffect(() => {
    if (data) {
      const { subject_id, topic_name, containt } = data?.data;
      setStudyData({
        subject_id,
        title: topic_name,
        description: {
          title: topic_name,
          description: containt,
        },
      });
      setContent(data?.data?.containt);
    }
  }, [data]);
  const editStudyMaterial = async (e) => {
    e.preventDefault();
    if (stripHtmlTags(content).length > 600) {
      toast.error("Content length should be less than 100");
      return;
    }
    const data = {
      id,
      subject_id: studyData.subject_id,
      topic_name: studyData.title,
      containt: content,
    };

    const { data: response } = await editStudy(data);
    if (response) {
      const { status } = response;
      if (status === 200) {
        navigate("/studys");
      }
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New Study Material</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => navigate("/studys")}
                  >
                    All Study Material Listing
                  </li>
                  <li class="breadcrumb-item active">edit Study Material</li>
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
                <h5>Add New Study Material</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row ">
                    <div class="col-md-8">
                      <span className="cardText">Subject dropdown</span>
                      <select
                        class="form-control btn-square"
                        id="formcontrol-select1"
                        name="subject_id"
                        value={studyData.subject_id}
                        onChange={(e) => handleValueChange(e)}
                      >
                        <option value={""}>Select Subject</option>
                        {allSubjects &&
                          allSubjects.map((item) => (
                            <option value={item._id}>
                              {item?.subject_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Subject Topics
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Subject Topic"
                          name="title"
                          value={studyData.title}
                          onChange={(val) => handleValueChange(val)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label htmlFor="videoTitle">Study Topic Content</label>

                        {studyTopicContent &&
                          studyTopicContent.map((item, index) => (
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
                                      onChange={(e) =>
                                        handleValueChangeContent(
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      className="form-control"
                                      id="videoTitle"
                                      type="text"
                                      placeholder="Description"
                                      name="description"
                                      value={item.description}
                                      onChange={(e) =>
                                        handleValueChangeContent(
                                          index,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                {index === 0 ? (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={addVideoField}
                                  >
                                    +
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={addVideoField}
                                    >
                                      +
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => removeVideoField(index)}
                                    >
                                      -
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="row"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div style={{ width: "100%", height: "50%" }}>
                      {/* Old editor */}
                      {/* <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => setContent(newContent)}
                      /> */}

                      {/* New Editor */}
                      <QuillTextEditor
                        ref={editor}
                        value={content}
                        setContent={(newContent) => setContent(newContent)}
                      />

                      {/* {content} */}
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
                          editStudyMaterial(e);
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
export default AddStudysMaterial;

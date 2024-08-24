import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import SideBar from "../../component/SideNav";
// import Footer from "../../component/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addWhatsNew,getWhatsNewStatus, selectedWhatsNewWithId } from "redux/Slices/WhatsNewSlice";
import {
  addWhatsNew,
  getWhatsNewStatus,
  selectedWhatsNewWithId,
} from "../../redux/Slices/WhatsNewSlice";
import { BASE_URL } from "utils/Global";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddWhatsNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const status = useSelector(getWhatsNewStatus);
  const selectedWhatsNew = useSelector((state) =>
    selectedWhatsNewWithId(state, id !== undefined ? id : 0)
  );

  const [whatsNewData, setWhatsNewData] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  console.log("eBookDataimagePreview", imagePreview);
  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/WhatsNew");
    }

    return () => {};
  }, [status]);

  useEffect(() => {
    if (id !== undefined) {
      setWhatsNewData({
        image: selectedWhatsNew[0]?.image ?? "",
        title: selectedWhatsNew[0]?.title ?? "",
        description: selectedWhatsNew[0]?.description ?? "",
      });
      setContent(selectedWhatsNew[0]?.description ?? "");
      // Display image preview if image exists
      if (selectedWhatsNew[0]?.image) {
        setImagePreview(selectedWhatsNew[0].image);
      }
    }

    return () => {};
  }, [id]);

  const handleValueChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      setWhatsNewData((prevState) => ({
        ...prevState,
        [name]: file,
      }));

      const fileName = file.name.replace(/^.*[\\\/]/, ""); // This will also give you 'download.jpg'

      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    } else {
      setWhatsNewData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const removeImage = () => {
    setWhatsNewData((prevState) => ({
      ...prevState,
      image: "",
    }));
    setImagePreview("");
  };
  // useEffect(() => {
  //   if (id !== undefined) {
  //     setWhatsNewData({
  //       image: selectedWhatsNew[0]?.image ?? '',
  //       title: selectedWhatsNew[0]?.title ?? '',
  //       description: selectedWhatsNew[0]?.description ?? ''
  //     })
  //   }

  //   return () => {

  //   }
  // }, [id])

  // const handleValueChange = (event) => {
  //   const { name, value, type } = event.target;

  //   if (type === 'file') {
  //     const file = event.target.files[0];

  //     setWhatsNewData(prevState => ({
  //       ...prevState,
  //       [name]: file
  //     }));
  //   } else {
  //     setWhatsNewData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // }

  const addwhatsnew = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (id !== undefined) {
      formData.append("whatsNew_id", id);
    }
    formData.append("image", whatsNewData.image);
    formData.append("title", whatsNewData.title);
    formData.append("description", content);
    dispatch(addWhatsNew(formData));
  };

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New Whats New </h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/whatsnew");
                    }}
                  >
                    All Whats New Listing
                  </li>
                  <li class="breadcrumb-item active">Add New Whats New</li>
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
                <h5>Add New Whats new</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
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
                        {/* {imagePreview && (
                          <div>
                            <img src={imagePreview} alt="Whats New Preview" style={{ maxWidth: '100%', marginTop: '10px'  }} />
                        // <img src={`${BASE_URL}${whatsNewData.image}`} alt="Selected Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
                            <button type="button" className="btn btn-danger" style={{marginLeft:"10px"  }}onClick={removeImage}>Remove</button>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Whats New Title
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Title"
                          name="title"
                          value={whatsNewData?.title}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Description
                        </label>
                        <QuillTextEditor
                          value={content}
                          style={{
                            margin: 0,
                            padding: 0,
                            height: "100%",
                          }}
                          setContent={setContent}
                        />
                        {/* <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={whatsNewData?.description}
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
                          addwhatsnew(e);
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
export default AddWhatsNew;

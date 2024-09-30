import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addeBooks, getEBookStatus, selectedEBookWithId } from "../../redux/Slices/EBookSlice";

const AddEBook = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { id } = location.state || {}
  const dispatch = useDispatch()
  const status = useSelector(getEBookStatus)
  const selectedEBook = useSelector(state => selectedEBookWithId(state, id !== undefined ? id : 0))

  const [eBookData, setEBookData] = useState({
    image: '',
    pdf_link: ''
  })
console.log("eBookData",eBookData);
const [imagePreview, setImagePreview] = useState('');
console.log("eBookDataimagePreview",imagePreview);

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === 'addSucceeded') {
      navigatpage('/ebook')
    }

    return () => {

    }
  }, [status])

  // useEffect(() => {
  //   if (id !== undefined) {
  //     setEBookData({
  //       image: selectedEBook[0]?.image ?? '',
  //       pdf_link: selectedEBook[0]?.pdf_link ?? ''
  //     })
  //   }

  //   return () => {

  //   }
  // }, [id])
  useEffect(() => {
    if (id !== undefined) {
      setEBookData({
        image: selectedEBook[0]?.image ?? '',
        pdf_link: selectedEBook[0]?.pdf_link ?? ''
      });
      
      // Display image preview if image exists
      if (selectedEBook[0]?.image) {
        setImagePreview(selectedEBook[0].image);
      }
    }

    return () => {

    }
  }, [id])




  // const handleValueChange = (event) => {
  //   const { name, value, type } = event.target;

  //   if (type === 'file') {
  //     const file = event.target.files[0];

  //     setEBookData(prevState => ({
  //       ...prevState,
  //       [name]: file
  //     }));
  //   } else {
  //     setEBookData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // }
  const handleValueChange = (event) => {
    const { name, value, type } = event.target;
  
    if (type === 'file') {
      const file = event.target.files[0];
      setEBookData(prevState => ({
        ...prevState,
        [name]: file
      }));
      
      // Extract only the file name
      // const fileName = file.name; // This will give you 'download.jpg'
      // Optionally, you can also remove the path prefix 'C:\\fakepath\\' if present
      const fileName = file.name.replace(/^.*[\\\/]/, ''); // This will also give you 'download.jpg'
  
      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreview('');
      }
    } else {
      setEBookData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }
  const removeImage = () => {
    setEBookData(prevState => ({
      ...prevState,
      image: '',
    }));
    setImagePreview('');
  }
  const addEBook = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (id !== undefined) {
      formData.append('book_id', id)
    }
    formData.append('image', eBookData.image)
    formData.append('pdf_link', eBookData.pdf_link)
    dispatch(addeBooks(formData))
  }

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New E-Book </h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/ebook");
                    }}
                  >
                    All E-Book Listing
                  </li>
                  <li class="breadcrumb-item active">Add New E-Book</li>
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
                <h5>Add New E-Book</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          E-Book Thumnail
                        </label>
                        <input
                        class="form-control"
                        id="exampleFormControlLastName"
                        type="file"
                        placeholder="Thumbnail image"
                        name="image"
                        onChange={(e) => handleValueChange(e)}
                        />
                        {/* {imagePreview && (
                          <div>
                            <img src={imagePreview} alt="Thumbnail Preview" style={{ maxWidth: '100%', marginTop: '10px'  }} />
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
                          E-Book Pdf Url
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="PDF Url"
                          name="pdf_link"
                          value={eBookData?.pdf_link}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button className="btn btn-color" type="submit" onClick={(e) => { addEBook(e) }}>
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
export default AddEBook;

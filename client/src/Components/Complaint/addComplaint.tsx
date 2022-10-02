import * as React from "react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "../Home/Navbar";
import Input from "../common/input";
import axios from "axios";
import ImageWithPlaceholder from "../common/ImageWithPlacerholder";
import { apiUrl, isImage } from "./../Utils/utility";
import Select from "./../common/Select";
import Footer from "../Footer/foooter";

interface ComplaintModel {
  title: string;
  description: string;
}

interface RegisterProps {
  navigate: any;
}

interface RegisterState {
  data: ComplaintModel;
  files: FileList | null;
  errors: Object;
  categories: Array<any>;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  state = {
    files: null,
    categories: [],
    data: {
      title: "",
      description: "",
      categoryId: "",
      isImage: true,
    },
    errors: {},
  };

  componentDidMount() {
    this.getCategories()
      .then((res) => {
        this.setState({ categories: res.data.data });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  getCategories = () => {
    var config = {
      method: "get",
      url: apiUrl + "category",
    };
    return axios(config);
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = { ...this.state.data };
    data[name as keyof ComplaintModel] = value;
    this.setState({ data });
  };
  categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const data = { ...this.state.data };
    data[name as keyof ComplaintModel] = value;
    this.setState({ data });
  };

  fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const validImage = isImage(e.target.files![0].name);
    const data = { ...this.state.data };
    data.isImage = validImage;
    this.setState({ files: e.target.files, data });
  };

  submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, categoryId } = this.state.data;
    if (title === "" || description === "" || categoryId === "") {
      return alert("all fields are required");
    }

    const fileValue = this.state.files ? this.state.files![0] : "";

    const user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");

    var data = new FormData();
    data.append("title", title);
    data.append("categoryId", categoryId);
    data.append("description", description);
    data.append("isImage", this.state.data.isImage.toString());
    data.append("file", fileValue);

    var config = {
      method: "post",
      headers: {
        "x-auth-header": user.token,
      },
      url: "http://localhost:8000/complaint/register",
      data: data,
    };

    try {
      await axios(config);
      alert(
        "Your complaint was registered successfuly. Please wait to process it."
      );
      this.props.navigate("/complaints");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <MainNavbar />

        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Register Complaint</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitForm}>
                    <ImageWithPlaceholder
                      fileInputHandler={this.fileInputHandler}
                      file={this.state.files}
                      isImage={this.state.data.isImage}
                    />

                    <Input
                      name="title"
                      error=""
                      type="text"
                      label="Title"
                      onChange={this.inputHandler}
                    />
                    <Input
                      name="description"
                      error=""
                      type="text"
                      label="Description"
                      onChange={this.inputHandler}
                    />
                    <Select
                      name="categoryId"
                      searchKey="_id"
                      searchValue="title"
                      error=""
                      data={this.state.categories}
                      label="Category"
                      onChange={this.categoryHandler}
                    />

                    <div className="d-grid mt-3">
                      <button type="submit" className="btn text-light main-bg">
                        Register Complaint
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

function WithNavigate(props: any) {
  let navigate = useNavigate();
  const location = useLocation();
  return <Register {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;

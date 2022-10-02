import * as React from "react";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserSchema from "../../Models/user";
import MainNavbar from "../Home/Navbar";
import Input from "../common/input1";
import axios from "axios";
import ImageWithPlaceholder from "../common/ImageWithPlacerholder";
import { Col, Row } from "react-bootstrap";
import Footer from "../Footer/foooter";

interface RProfileProps {
  navigate: any;
}

interface ProfileState {
  data: UserSchema;
  files: FileList | null;
  errors: Object;
  resourceUrl: string | null;
}

class Profile extends React.Component<RProfileProps, ProfileState> {
  state = {
    files: null,
    resourceUrl: null,
    data: {
      email: "",
      password: "",
      gender: "",
      fullName: "",
    },
    errors: {},
  };

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");
    const data = { ...this.state.data };
    data.fullName = user.user.fullName;
    data.gender = user.user.gender;
    data.email = user.user.email;
    this.setState({ data, resourceUrl: user.user.image });
  }

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = { ...this.state.data };
    data[name as keyof UserSchema] = value;
    this.setState({ data });
  };

  fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    this.setState({ files: e.target.files });
  };

  submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, fullName, gender } = this.state.data;
    if (email === "" || fullName === "" || gender === "") {
      return alert("all fields are required");
    }

    const fileValue = this.state.files
      ? this.state.files![0]
      : this.state.resourceUrl
      ? this.state.resourceUrl
      : "";

    var data = new FormData();
    data.append("gender", gender);
    data.append("email", email);
    data.append("fullName", fullName);
    data.append("file", fileValue);

    var config = {
      method: "post",
      url: "http://localhost:8000/user/update",
      data: data,
    };

    try {
      const res = await axios(config);
      let user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");
      user.user = res.data.data;
      sessionStorage.setItem("complaintuser", JSON.stringify(user));
      alert("Updated successfully!!");
      this.props.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <MainNavbar />

        <div className="container my-5">
          <div className="row justify-content-center mt-5">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Profile</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitForm}>
                    <Row>
                      <Col className="col-md-6">
                        <ImageWithPlaceholder
                          fileInputHandler={this.fileInputHandler}
                          file={this.state.files}
                          resourceUrl={this.state.resourceUrl}
                        />
                      </Col>
                      <Col className="col-md-6">
                        <Input
                          name="fullName"
                          error=""
                          type="text"
                          label="Full Name"
                          value={this.state.data.fullName}
                          onChange={this.inputHandler}
                        />
                        <Input
                          name="gender"
                          error=""
                          type="text"
                          label="Gender"
                          value={this.state.data.gender}
                          onChange={this.inputHandler}
                        />
                        <Input
                          name="email"
                          error=""
                          type="email"
                          label="Email"
                          value={this.state.data.email}
                          onChange={this.inputHandler}
                        />
                      </Col>
                    </Row>

                    <div className="d-grid">
                      <button type="submit" className="btn text-light main-bg">
                        Update Profile
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
  return <Profile {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;

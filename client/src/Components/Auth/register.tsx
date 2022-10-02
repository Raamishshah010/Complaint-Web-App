import * as React from "react";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserSchema from "../../Models/user";
import MainNavbar from "../Home/Navbar";
import Input from "./../common/input";
import axios from "axios";
import ImageWithPlaceholder from "../common/ImageWithPlacerholder";

interface RegisterProps {
  navigate: any;
}

interface RegisterState {
  data: UserSchema;
  files: FileList | null;
  errors: Object;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  state = {
    files: null,
    data: {
      email: "",
      password: "",
      gender: "",
      fullName: "",
    },
    errors: {},
  };

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
    const { email, fullName, gender, password } = this.state.data;
    if (email === "" || fullName === "" || password === "" || gender === "") {
      return alert("all fields are required");
    }
   
    const fileValue = this.state.files ? this.state.files![0] : "";
    
    var data = new FormData();
    data.append("password", password);
    data.append("gender", gender);
    data.append("email", email);
    data.append("fullName", fullName);
    data.append("file", fileValue);

    var config = {
      method: "post",
      url: "http://localhost:8000/user/register",
      data: data,
    };

    try {
      const res = await axios(config);
      sessionStorage.setItem("complaintuser", JSON.stringify(res.data));
      this.props.navigate("/");
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
            <div className="col-lg-7 col-md-6 col-sm-6">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Register</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitForm}>
                    <ImageWithPlaceholder
                      fileInputHandler={this.fileInputHandler}
                      file={this.state.files}
                    />

                    <Input
                      name="fullName"
                      error=""
                      type="text"
                      label="Full Name"
                      onChange={this.inputHandler}
                    />
                    <Input
                      name="gender"
                      error=""
                      type="text"
                      label="Gender"
                      onChange={this.inputHandler}
                    />
                    <Input
                      name="email"
                      error=""
                      type="email"
                      label="Email"
                      onChange={this.inputHandler}
                    />
                    <Input
                      name="password"
                      error=""
                      type="password"
                      label="Password"
                      onChange={this.inputHandler}
                    />

                    <div className="d-grid">
                      <button type="submit" className="btn text-light main-bg">
                        Register
                      </button>
                      <Link className="m-2" to="/login">
                        signin
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
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

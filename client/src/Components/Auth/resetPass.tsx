import * as React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Home/Navbar";
import Input from "../common/input";
import axios from "axios";

interface ResetPasswordSchema {
  email: string;
  password: string;
  confirmpassword: string;
}

interface ResetPasswordProps {
  navigate: any;
}

interface ResetPasswordState {
  data: ResetPasswordSchema;
  errors: Object;
}

class ResetPassword extends React.Component<
  ResetPasswordProps,
  ResetPasswordState
> {
  state = {
    data: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    errors: {},
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = { ...this.state.data };
    data[name as keyof ResetPasswordSchema] = value;
    this.setState({ data });
  };

  submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmpassword } = this.state.data;
    console.log(this.state.data);

    if (email.trim() === "" || password.trim() === "") {
      return alert("all fields are required");
    }
    if (password.trim() !== confirmpassword.trim()) {
      return alert("Password should be matche.");
    }
    var data = new FormData();
    data.append("password", password);
    data.append("email", email);

    var config = {
      method: "post",
      url: "http://localhost:8000/user/resetpassword",
      data: data,
    };

    try {
      await axios(config);
      alert("Password changed!!");
      this.props.navigate("/login");
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
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Reset Password</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitForm}>
                    <Input
                      name="email"
                      error=""
                      type="text"
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
                    <Input
                      name="confirmpassword"
                      error=""
                      type="password"
                      label="Confirm Password"
                      onChange={this.inputHandler}
                    />

                    <div className="d-grid">
                      <button type="submit" className="btn text-light main-bg">
                        Submit
                      </button>
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
  const navigate = useNavigate();
  return <ResetPassword {...props} navigate={navigate} />;
}

export default WithNavigate;

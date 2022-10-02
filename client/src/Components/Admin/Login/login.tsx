import * as React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./../../common/input";
import axios from "axios";

interface LoginSchema {
  email: string;
  password: string;
}

interface LoginProps {
  navigate: any;
}

interface LoginState {
  data: LoginSchema;
  errors: Object;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = { ...this.state.data };
    data[name as keyof LoginSchema] = value;
    this.setState({ data });
  };

  submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = this.state.data;
    console.log(this.state.data);

    if (email.trim() === "" || password.trim() === "") {
      return alert("all fields are required");
    }
    var data = new FormData();
    data.append("password", password);
    data.append("email", email);

    var config = {
      method: "post",
      url: "http://localhost:8000/admin/login",
      data: data,
    };

    try {
      const res = await axios(config);
      sessionStorage.setItem("complaintadmin", JSON.stringify(res.data));
      this.props.navigate("/admin/dash");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Admin Login</h2>
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

                    <div className="d-grid">
                      <button type="submit" className="btn text-light main-bg">
                        Login
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
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;

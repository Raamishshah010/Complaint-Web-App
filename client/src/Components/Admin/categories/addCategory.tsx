import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../common/input";
import axios from "axios";
import Sidebar from "../Sidebar/sidebar";

interface RegisterProps {
  navigate: any;
}

interface RegisterState {
  title: string;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  state = {
    title: "",
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title } = this.state;
    if (title === "") {
      return alert("title are required");
    }

    var data = new FormData();
    data.append("title", title);

    const admin = JSON.parse(sessionStorage.getItem("complaintadmin") || "{}");

    var config = {
      method: "post",
      url: "http://localhost:8000/category/add",
      headers: {
        "x-auth-header": admin.token,
      },
      data: data,
    };

    try {
      await axios(config);
      this.props.navigate("/admin/categories");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Sidebar>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Add Category</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={this.submitForm}>
                    <Input
                      name="title"
                      error=""
                      type="text"
                      label="Title"
                      onChange={this.inputHandler}
                    />

                    <div className="d-grid">
                      <button type="submit" className="btn text-light main-bg">
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }
}

function WithNavigate(props: any) {
  let navigate = useNavigate();
  const location = useLocation();
  return <Register {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;

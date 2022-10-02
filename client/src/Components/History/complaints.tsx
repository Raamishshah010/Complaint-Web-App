import React, { FunctionComponent, useEffect, useState } from "react";
import MainNavbar from "../Home/Navbar";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Complaint from "../../Models/compalint";
import axios from "axios";
import { apiUrl } from "../Utils/utility";
import SingleComplaint from "../Complaint/SingleComplaint";
import Footer from "../Footer/foooter";

interface ComplaintsProps {}

const UserComplaints: FunctionComponent<ComplaintsProps> = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const getComplaints = () => {
      var config = {
        method: "get",
        url: apiUrl + "complaint",
      };
      return axios(config);
    };

    getComplaints()
      .then((res) => {
        let user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");
        let usercoms: Array<any> = [];
        if (Object.keys(user).length > 0) {
          res.data.data.forEach((item: any) => {
            console.log(item.userId._id,  user);
            if (item.userId._id == user.user._id) {
              usercoms.push(item);
            }
          });
        }
        setComplaints(usercoms);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const likedHandler = (id: string) => {
    let user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");

    var data = JSON.stringify({ likerId: user.user._id });

    var config = {
      method: "post",
      url: apiUrl + `complaint/like/addorremove/${id}`,
      headers: {
        "x-auth-header": user.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const allcomplaints = [...complaints];
        const index = allcomplaints.findIndex((it) => it._id === id);

        let likes = [...allcomplaints[index].likes];

        const userindex = likes.findIndex((it) => it === user.user._id);

        if (userindex < 0) {
          likes.push(user.user._id);
          allcomplaints[index].likes = likes;
          allcomplaints[index].likescounter =
            allcomplaints[index].likescounter + 1;
        } else {
          likes = likes.filter((likerId) => likerId !== user.user._id);
          allcomplaints[index].likes = likes;
          allcomplaints[index].likescounter =
            allcomplaints[index].likescounter - 1;
        }

        setComplaints(allcomplaints);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <React.Fragment>
      <MainNavbar />
      <Container>
        <h3>History</h3>
        <Link className="btn primary-button  btn-block" to="/complaints/add">
          Register Complaint
        </Link>
        <Row>
          {complaints.map((item, index) => (
            <SingleComplaint
              complaint={item}
              key={index}
              likedHandler={likedHandler}
            />
          ))}
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default UserComplaints;

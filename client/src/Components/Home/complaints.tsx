import React, { FunctionComponent, useEffect, useState } from "react";
import MainNavbar from "./Navbar";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Complaint from "../../Models/compalint";
import axios from "axios";
import { apiUrl } from "../Utils/utility";
import SingleComplaint from "./SingleComplaint";

interface ComplaintsProps {}

const Complaints: FunctionComponent<ComplaintsProps> = () => {
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
        setComplaints(res.data.data);
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
      <Container>
        <h2>
          <span className="logoText">Complaints</span>
        </h2>
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
    </React.Fragment>
  );
};

export default Complaints;

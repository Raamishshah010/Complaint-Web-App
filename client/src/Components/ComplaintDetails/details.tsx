import axios from "axios";
import { FC, FormEvent, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import ComplaintSchema from "../../Models/compalint";
import Footer from "../Footer/foooter";
import MainNavbar from "../Home/Navbar";
import { apiUrl } from "../Utils/utility";
import Input from "./../common/input";

interface ComplaintDetailsProps {}

const SingleComplaint: FC<ComplaintDetailsProps> = () => {
  const location = useLocation();
  const [comment, setComment] = useState<string>("");
  const [complaint, setComplaint] = useState<ComplaintSchema>({
    _id: "",
    categoryId: "",
    description: "",
    isImage: false,
    likescounter: 0,
    likes: [],
    reviews: [],
    resource: "",
    title: "",
    userId: "",
  });

  let user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");

  useEffect(() => {
    const complaint: ComplaintSchema = location.state as ComplaintSchema;
    setComplaint(complaint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLikeStatus = () => {
    const index = complaint.likes.findIndex(
      (item: any) => item === user.user._id
    );
    if (index < 0) {
      return false;
    } else {
      return true;
    }
  };

  const submitReview = async (e: FormEvent) => {
    e.preventDefault();

    if (comment.trim().length === 0) {
      return alert("Form should be filled");
    }

    const user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");

    var data = new FormData();
    data.append("userId", user.user._id);
    data.append("userName", user.user.fullName);
    data.append("comment", comment);

    var config = {
      method: "post",
      headers: {
        "x-auth-header": user.token,
      },
      url: `http://localhost:8000/complaint/review/${complaint._id}`,
      data: data,
    };

    try {
      const res = await axios(config);
      if (res.data.message === "failed") {
        return alert("You already casted your review");
      }
      const reviews = [...complaint.reviews];
      const sComplaint = { ...complaint };
      reviews.unshift({
        userId: user.user._id,
        userName: user.user.fullName,
        comment,
      });
      sComplaint.reviews = reviews;
      setComplaint(sComplaint);
      alert("Your review is added successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainNavbar />
      <Container className="my-5">
        <Card className="card">
          <span className="spanLine"></span>
          <Card.Body>
            {complaint.resource &&
              (complaint.isImage ? (
                <img
                  src={apiUrl + complaint.resource}
                  alt=""
                  width="100%"
                  height="500px"
                />
              ) : (
                <video width="100%" height="500px" controls>
                  <source src={apiUrl + complaint.resource} />
                </video>
              ))}
            <Card.Title className="title">
              <strong>{complaint.title}</strong>
            </Card.Title>
            <Card.Text>{complaint.description}</Card.Text>
            <div className="likeComplaint">
              <span>
                Category Name: <strong>{complaint.categoryId.title} </strong>
              </span>
              {Object.keys(user).length > 0 && (
                <span style={{ cursor: "pointer" }}>
                  {checkLikeStatus() ? (
                    <span>
                      <FaThumbsUp /> ({complaint.likescounter})
                    </span>
                  ) : (
                    <span>
                      <FiThumbsUp /> ({complaint.likescounter})
                    </span>
                  )}
                </span>
              )}
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Reviews</Card.Title>
          <Card.Body>
            <ul>
              {complaint.reviews.length > 0
                ? complaint.reviews.map((item) => (
                    <li>
                      <h3>User: {item.userName}</h3>
                      <p>{item.comment}</p>
                    </li>
                  ))
                : "There is no reviews yet"}
            </ul>
          </Card.Body>
        </Card>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Add Review</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={submitReview}>
                    <Input
                      name="description"
                      error=""
                      type="text"
                      label="Review"
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <div className="d-grid mt-3">
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
      </Container>
      <Footer />
    </>
  );
};

export default SingleComplaint;

import { FC } from "react";
import { Col, Card } from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../Utils/utility";

interface SingleComplaintProps {
  complaint: any;
  likedHandler: (id: string) => void;
}

const SingleComplaint: FC<SingleComplaintProps> = ({
  complaint,
  likedHandler,
}) => {
  const navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("complaintuser") || "{}");

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

  return (
    <Col className="col-xs-12 col-md-4 my-2">
      <Card className="card">
        <span className="spanLine"></span>

        <Card.Body>
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/complaints/details", {
                state: complaint,
              })
            }
          >
            {complaint.resource  && (
              complaint.isImage ? (
                <img
                  src={apiUrl + complaint.resource}
                  alt=""
                  width="100%"
                  height="300px"
                />
              ) : (
                <video width="100%" height="300px" controls>
                  <source src={apiUrl + complaint.resource} />
                </video>
              )
            )}
            <Card.Title className="title">{complaint.title}</Card.Title>
            <Card.Text className={complaint.resource && "scrollable-div"}>
              {complaint.description}
            </Card.Text>
          </div>
          <div className="likeComplaint">
            <span>
              <strong>{complaint.categoryId.title} </strong>
            </span>
            <span
              onClick={() => likedHandler(complaint._id)}
              style={{ cursor: "pointer" }}
            >
              {Object.keys(user).length > 0 ? (
                checkLikeStatus() ? (
                  <span>
                    <FaThumbsUp /> ({complaint.likescounter})
                  </span>
                ) : (
                  <span>
                    <FiThumbsUp /> ({complaint.likescounter})
                  </span>
                )
              ) : (
                ""
              )}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleComplaint;

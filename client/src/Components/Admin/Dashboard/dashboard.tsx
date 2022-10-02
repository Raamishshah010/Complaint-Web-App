import * as React from "react";
import Sidebar from "../Sidebar/sidebar";
import CardItem from "../../common/card";
import { Container, Row } from "react-bootstrap";
import { apiUrl } from "../../Utils/utility";
import axios from "axios";

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const [complaints, setComplaints] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getComplaints = () => {
      var config = {
        method: "get",
        url: apiUrl + "complaint/all",
      };
      return axios(config);
    };
    const getUsers = () => {
      var config = {
        method: "get",
        url: apiUrl + "user",
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
    getUsers()
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);
  return (
    <Sidebar>
      <Container className="my-3">
        <Row>
          <CardItem title="Users" content={users.length.toString()} />
          <CardItem title="Complaints" content={complaints.length.toString()} />
        </Row>
      </Container>
    </Sidebar>
  );
};

export default Dashboard;

import { FunctionComponent, useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../Utils/utility";
import UserTable from "./userTable";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = () => {
      var config = {
        method: "get",
        url: apiUrl + "user",
      };
      return axios(config);
    };

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
      <Container>
        <h3>Users</h3>
        <UserTable data={users} />
      </Container>
    </Sidebar>
  );
};

export default Users;

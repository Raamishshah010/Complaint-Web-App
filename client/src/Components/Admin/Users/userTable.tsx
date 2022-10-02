import React from "react";
import Table from "../../common/table";
import Placeholder from "../../../assets/placeholder.png";
import { apiUrl } from "../../Utils/utility";

interface UserTableProps {
  data: Array<any>;
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {
  console.log(data);
  const columns = [
    {
      label: "Image",
      key: "Image",
      content: (item: any) => (
        <div>
          <img
            src={item.image ? apiUrl + item.image : Placeholder}
            style={{ height: "50px", width: "80px", borderRadius: "5px" }}
          />
        </div>
      ),
    },
    {
      label: "Name",
      key: "Name",
      content: (item: any) => <span>{item.fullName}</span>,
    },
    {
      label: "Email",
      key: "email",
      content: (item: any) => <span>{item.email}</span>,
    },
    {
      label: "Gender",
      key: "Gender",
      content: (item:any) => <span>{item.gender}</span>,
    },
    
    {
      key: "Delete",
      label: "",
      content: (item: any) => (
        <button
          className="btn btn-danger"
          // onClick={() => deleteUser(item._id, item.image)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <div className="my-3">
      <Table data={data} coloumns={columns} />
    </div>
  );
};

export default UserTable;

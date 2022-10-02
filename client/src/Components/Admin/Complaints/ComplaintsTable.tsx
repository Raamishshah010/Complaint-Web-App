import React from "react";
import Table from "../../common/table";
import Placeholder from "../../../assets/placeholder.png";
import { apiUrl } from "../../Utils/utility";

interface ComplaintTableProps {
  data: Array<any>;
  remarksHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
  statusHandler: (item: any) => void;
}

const ComplaintTable: React.FC<ComplaintTableProps> = ({
  data,
  remarksHandler,
  deleteHandler,
  statusHandler,
}) => {
  const columns = [
    {
      label: "Image",
      key: "Image",
      content: (item: any) => (
        <div>
          {item.isImage ? (
            <img
              src={item.resource ? apiUrl + item.resource : Placeholder}
              alt="Complaint Img"
              style={{ height: "100px", width: "180px", borderRadius: "5px" }}
            />
          ) : (
            <video width="180px" height="100px" controls>
              <source src={apiUrl + item.resource} />
            </video>
          )}
        </div>
      ),
    },
    {
      label: "Title",
      key: "Title",
      content: (item: any) => <span>{item.title}</span>,
    },
    {
      label: "Description",
      key: "decription",
      content: (item: any) => <span>{item.description}</span>,
    },
    {
      label: "Remarks",
      key: "remarks",
      content: (item: any) => <span>{item.remarks}</span>,
    },
    {
      key: "RemarksButtonKey",
      label: "",
      content: (item: any) => (
        <button
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#paymentmodal"
          onClick={() => remarksHandler(item._id)}
        >
          Remarks
        </button>
      ),
    },
    {
      label: "Allow Alerts Notification",
      key: "Allow Alerts Notification",
      content: (item: any) => (
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={item._id + "1234"}
            checked={item.status}
            onChange={() => statusHandler(item)}
          />
          <label className="custom-control-label" htmlFor={item._id + "1234"}>
            Not-Approve/Approve
          </label>
        </div>
      ),
    },
    {
      key: "Delete",
      label: "",
      content: (item: any) => (
        <button
          className="btn btn-danger"
          onClick={() => deleteHandler(item._id)}
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

export default ComplaintTable;

import { FunctionComponent, useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import { Container, Modal } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../Utils/utility";
import ComplaintsTable from "./ComplaintsTable";
import TextArea from "../../common/TextArea";

interface ComplaintProps {}

const AdminComplaints: FunctionComponent<ComplaintProps> = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [remarks, setRemarks] = useState<string>("");
  const [complaiintId, setComplaintId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getComplaints = () => {
      var config = {
        method: "get",
        url: apiUrl + "complaint/all",
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

  const deleteHandler = (cid: string) => {
    const confirm = window.confirm("Are you you want tot delete?");

    if (!confirm) return;

    let admin = JSON.parse(sessionStorage.getItem("complaintadmin") || "{}");

    var config = {
      method: "delete",
      url: apiUrl + `complaint/delete/${cid}`,
      headers: {
        "x-auth-header": admin.token,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        let allcomplaints = [...complaints];
        allcomplaints = allcomplaints.filter((item) => item._id !== cid);
        setComplaints(allcomplaints);
        alert("successfully deleted!!!");
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };

  const statusHandler = (item: any) => {
    let admin = JSON.parse(sessionStorage.getItem("complaintadmin") || "{}");

    var data = JSON.stringify({ status: !item.status });

    var config = {
      method: "post",
      url: apiUrl + `complaint/status/${item._id}`,
      headers: {
        "x-auth-header": admin.token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let allcomplaints = [...complaints];
        const index: number = allcomplaints.findIndex(
          (it) => it._id === item._id
        );
        allcomplaints[index].status = !allcomplaints[index].status;
        setComplaints(allcomplaints);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };
  const remarksHandler = (id: string) => {
    setComplaintId(id);
    setShowModal(!showModal);
  };
  const submitRemarks = () => {
    let admin = JSON.parse(sessionStorage.getItem("complaintadmin") || "{}");
    console.log(remarks);

    if (remarks.trim() === "") {
      return alert("Remarks should not be empty");
    }
    var data = JSON.stringify({ remarks });

    var config = {
      method: "post",
      url: apiUrl + `complaint/remarks/${complaiintId}`,
      headers: {
        "x-auth-header": admin.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const allcomplaints = [...complaints];
        const index = allcomplaints.findIndex((it) => it._id === complaiintId);

        if (index >= 0) {
          allcomplaints[index].remarks = remarks;
        }
        setComplaints(allcomplaints);
        setShowModal(!showModal);
        alert("successfully added");
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <Sidebar>
      <Container>
        <h3>Complaints</h3>
        <ComplaintsTable
          data={complaints}
          remarksHandler={remarksHandler}
          statusHandler={statusHandler}
          deleteHandler={deleteHandler}
        />
      </Container>
      <Modal
        show={showModal}
        dialogClassName="chatmodal"
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Body>
          <h2>Admin Remarks</h2>
          <TextArea
            type="text"
            name="remarks"
            error=""
            label="Remarks"
            onChange={(e) => setRemarks(e.target.value)}
          />
          <div className="btn primary-button px-5 mt-3" onClick={submitRemarks}>
            Submit
          </div>
        </Modal.Body>
      </Modal>
    </Sidebar>
  );
};

export default AdminComplaints;

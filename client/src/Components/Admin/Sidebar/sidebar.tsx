import { Fragment, FunctionComponent, ReactNode } from "react";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { AiOutlineComment } from "react-icons/ai";
import { FaBars, FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { ImUsers } from "react-icons/im";
import NavItem from "./NavItem";
import comaplaintImg from "../../../assets/complaint.jpg";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const admin = JSON.parse(sessionStorage.getItem("complaintadmin") || "{}");
  const navigate = useNavigate();

  const logoutHandler = () => {
    const confirm = window.confirm("Are you sure to logout?");
    if (!confirm) return;

    sessionStorage.removeItem("complaintadmin");
    navigate("/admin");
  };

  return (
    <Fragment>
      <nav>
        <label>Admin</label>
        <ul>
          <li>
            <FaBars className="bar-icon" />
          </li>
          <li>
            <button className="btn btn-danger" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="side-menu">
        <div className="gravatar">
          <img src={comaplaintImg} alt="Profile" />
          <p className="profile-name">{admin.admin.name}</p>
          <p className="profile-email">{admin.admin.email}</p>
        </div>

        <div className="side-menu-items">
          <NavItem path="/admin/dash" Icon={FaHome} label="Dahboard" />
          <NavItem path="/admin/users" Icon={ImUsers} label="Users" />
          <NavItem
            path="/admin/categories"
            Icon={BiCategory}
            label="Categories"
          />
          <NavItem
            path="/admin/complaints"
            Icon={AiOutlineComment}
            label="Complaints"
          />

          <li onClick={logoutHandler} style={{ cursor: "pointer" }}>
            <a>
              <RiLogoutCircleRFill />
              <span>Logout</span>
            </a>
          </li>
        </div>
      </div>

      <main>
        <h2>{props.children}</h2>
      </main>
    </Fragment>
  );
};

export default Sidebar;

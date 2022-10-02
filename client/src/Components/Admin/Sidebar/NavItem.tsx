import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  path: string;
  Icon: any;
}

const NavItem: React.FC<NavItemProps> = ({ label, path, Icon, ...rest }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "active" : "")}
        {...rest}
      >
        <Icon />
        <span className="list">{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;

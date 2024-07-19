import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { HiUser } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { RiAppsFill } from "react-icons/ri";
import {BsSuitHeartFill} from "react-icons/bs"
import {useSelector} from "react-redux"

const Navbar = () => {
  const {user} = useSelector((state) => state.auth.authData)

  return (
    <div className="Navbar">
      <div className="icons">
        <NavLink to="/">
          <HiHome />
        </NavLink>
      </div>
      <div className="icons">
        <NavLink to="/find/friend">
          <RiAppsFill />
        </NavLink>
      </div>
      <div className="Add">
        <NavLink to="/new/post">
          <div className="inner_box">
            <GrAdd />
          </div>
        </NavLink>
      </div>
      <div className="icons">
        <NavLink to='/aboutdeveloper'>
          <BsSuitHeartFill />
        </NavLink>
      </div>
      <div className="icons">
        <NavLink to={`/profile/${user?._id}`}>
          <HiUser />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

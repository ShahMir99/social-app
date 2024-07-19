import React from "react";
import "./SearchUsers.css";
import { MdVerified } from "react-icons/md";
import { NavLink } from "react-router-dom";
import defaultDp from "../../image/defaultDp.png";


const SearchUsers = ({ data }) => {


  return (
    <div className="SearchUsers">
      <div className="__Signle__user">
        <img src={data.profile?.url ? data.profile.url : defaultDp} alt="" />
        <div className="name">
          <div className="heading">
            <NavLink to={`/profile/${data._id}`}>
              <h2>{data.name}</h2>
            </NavLink>
            {data.isverify ? <MdVerified /> : ""}
          </div>
          <p>@{data.username}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;

import React, { useState , useEffect } from "react";
import "./SearchBar.css";
import { CiSearch } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import {SearchUser} from "../../Actions/userAction"
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

const SearchBar = ({ toggleFocus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputVal, SetinputVal] = useState("");

  const navigateToSearch = () => {
    navigate("/find/friend");
  };

  const backSpace = () => {
    navigate(-1);
  };

  const logout = () => {
    dispatch({type : 'LOGOUT'})
  }

  const handleSearch = () => {
    dispatch(SearchUser(inputVal))
  }

  useEffect(() => {
    dispatch(SearchUser(inputVal))
  }, [dispatch ])
  

  return (
    <div className="search__bar">
      <div
        className={toggleFocus ? "full_length search" : "search "}
        onClick={navigateToSearch}
      >
        {toggleFocus ? (
          <>
            <MdKeyboardBackspace onClick={backSpace} />
            <input
              type="text"
              autoFocus
              value={inputVal}
              placeholder="Search Friends"
              autoComplete="off"
              onChange={(e) => SetinputVal(e.target.value)}
              onKeyUp={handleSearch}
            />
          </>
        ) : (
          <>
            <CiSearch />
            <input type="text" placeholder="search" />
          </>
        )}
      </div>
      {toggleFocus ? (
        <div className={toggleFocus ? "message cross" : "message"}>
          {inputVal ? <IoClose onClick={() => SetinputVal("")} /> : ""}
        </div>
      ) : (
        <div className="message">
          <FiLogOut onClick={logout}/>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

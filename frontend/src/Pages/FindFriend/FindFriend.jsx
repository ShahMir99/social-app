import React from "react";
import "./FindFriend.css";
import SearchUsers from "../../Components/SearchUsers/SearchUsers";
import Navbar from "../../Components/Navbar/Navbar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import NaN from "../../image/NaN.png";
import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import { SearchUser } from "../../Actions/userAction";


const FindFriend = () => {
  const toggleFocus = true;
  const dispatch = useDispatch();

  const { Users} = useSelector((state) => state.Search);
  const { user} = useSelector((state) => state.auth.authData);

  return (
    <div className="Find_friend">
      <Navbar />
      <SearchBar toggleFocus={toggleFocus} />
      <div className="findUsers">
        {Users && Users.length > 0 ? (
          Users.filter((postData) => postData._id !== user._id).map((data) => {
            return <SearchUsers data={data} />;
          })
        ) : (
          <div className="userNotFind">
            <img src={NaN} alt="User Not Find" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindFriend;

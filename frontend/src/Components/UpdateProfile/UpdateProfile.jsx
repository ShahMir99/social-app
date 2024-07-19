import React, { useEffect } from "react";
import "./UpdateProfile.css";
import bg2 from "../../image/bg2.png";
import profile from "../../image/defaultDp.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector , useDispatch} from "react-redux";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import {ProfileUpdate} from "../../Actions/userAction"
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Params = useParams();
  const dpRef = useRef();
  const coverRed = useRef();
  const { user } = useSelector((state) => state.auth.authData);
  const [pass , ShowPass] = useState(true)

  useEffect(() => {
    SetupdateUser({
      name : user?.name,
      username : user?.username,
      password : user?.password,
      about : user?.about,
      Relationship: user?.Relationship
    })
  },[user?.name,user?.username,user?.password, user?.about , user?.Relationship])


  const [updateUser, SetupdateUser] = useState({
    name: "",
    username: "",
    password: "",
    about: "",
    profile : null,
    cover : null,
    Relationship: ""
  });

  const UpdateProfileOnChange = (e) => {
    const { value, name } = e.target;
    SetupdateUser((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const handleDpImage = (e) => {
    const File = e.target.files[0];
    const ReadFile = new FileReader();
    ReadFile.readAsDataURL(File);
    ReadFile.onloadend = () => {
      if (ReadFile.readyState === 2) {
        SetupdateUser({...updateUser , profile : ReadFile.result})
      }
    };
  };

  

  const handleCoverImage = (e) => {
    const File = e.target.files[0];
    const ReadFile = new FileReader();
    ReadFile.readAsDataURL(File);
    ReadFile.onloadend = () => {
      if (ReadFile.readyState === 2) {
        SetupdateUser({...updateUser , cover: ReadFile.result})
      }
    };
  };

  const saveChanges = () => {
    dispatch(ProfileUpdate(Params.id , updateUser));
    navigate(-1)
  }

  



  return (
    <div className="update_profile_Main">
      <div className="backspace">
        <div
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <MdKeyboardBackspace onClick={() => navigate(-1)} />
          <h3>Edit Profile</h3>
        </div>
        <button type="submit" onClick={saveChanges}>Save</button>
      </div>

      <div className="update_bg_div">
        <img src={updateUser.cover ? updateUser.cover : bg2} alt="" />
        <AddAPhotoIcon onClick={() => dpRef.current.click()} />
        <input
          type="file"
          ref={dpRef}
          style={{ display: "none" }}
          onChange={handleCoverImage}
        />
      </div>

      <div className="profile_image">
        <div className="img_box">
          <div className="inner_img_box">
            <img src={updateUser.profile ? updateUser.profile : profile} alt="" />
            <AddAPhotoIcon onClick={() => coverRed.current.click()} />
            <input type="file" ref={coverRed} style={{ display: "none" }} onChange={handleDpImage}/>
          </div>
        </div>
      </div>

      <div className="update_input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={updateUser.name} id="name" autoComplete="off" onChange={UpdateProfileOnChange}/>
      </div>

      <div className="update_input">
        <label htmlFor="name">Username</label>
        <input type="text" name="username" value={updateUser.username} id="name" autoComplete="off" onChange={UpdateProfileOnChange}/>
      </div>

      <div className="update_input">
        <label htmlFor="name">Password</label>
        <input type={pass ? "password" : "text"} name="password" value={updateUser.password} id="name" autoComplete="off" onChange={UpdateProfileOnChange} onClick={() => ShowPass((preval) => !preval)}/>
      </div>

      <div className="update_input">
        <label htmlFor="name">Relationship</label>
        <input type="text" name="Relationship" value={updateUser.Relationship} id="name" autoComplete="off" onChange={UpdateProfileOnChange}/>
      </div>

      <div className="update_about">
        <label htmlFor="about">About</label>
        <textarea name="about" value={updateUser.about} id="about" onChange={UpdateProfileOnChange}></textarea>
      </div>
    </div>
  );
};

export default UpdateProfile;

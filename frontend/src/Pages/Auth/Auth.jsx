import React, { useState } from "react";
import "./Auth.css";
import img1 from "../../image/signup.png";
import { Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FcGoogle } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../../Actions/userAction";



const Auth = () => {
  const {Loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [isSignup, setSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const passHandle = () => {
    setShowPass((preVal) => !preVal);
  };

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const clearFormData = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(userRegister(formData));
      clearFormData();
    } else {
      dispatch(userLogin(formData));
      clearFormData();
    }
  };

  return (
    <>
      <div className="authContainer">
        <div className="imageBox">
          <img src={img1} alt="Slow Internet Connection" />
        </div>
        <form className="form" onSubmit={handleRegister}>
          {isSignup && (
            <input
              className="input"
              name="name"
              value={formData.name}
              type="text"
              placeholder="Name"
              autoComplete="off"
              onChange={handleChange}
            />
          )}
          <input
            className="input"
            name="username"
            value={formData.username}
            type="username"
            placeholder="username"
            autoComplete="off"
            onChange={handleChange}
          />
          <div className="pass_field">
            <input
              className="input"
              name="password"
              value={formData.password}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            {showPass ? (
              <VisibilityIcon onClick={passHandle} />
            ) : (
              <VisibilityOffIcon onClick={passHandle} />
            )}
          </div>

          {isSignup ? "" : <span>FORGOT PASSWORD</span>}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            className={Loading ? "Loading button" : "button"}
            disabled={Loading ? true : false}
          >
            {isSignup ? "Sign Up" : "Sign In"}
            {Loading ? <TfiReload className="load__icon" /> : ""}
          </Button>

          {isSignup && (
            <>
              <span>OR LOG IN BY</span>
              <div className="googleIcon">
                <FcGoogle />
              </div>
            </>
          )}
          <div
            className="bottom_warning"
            onClick={() => setSignup((pre) => !pre)}
          >
            <span>
              {isSignup ? "Already have account ?" : "Don't have account ?"}
            </span>{" "}
            &nbsp;
            <span style={{ color: "#5252C7", fontWeight: "500" }}>
              {isSignup ? "SIGN IN" : "SIGN UP"}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;

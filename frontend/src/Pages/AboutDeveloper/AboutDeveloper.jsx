import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import mydp from "../../image/my.jpg";
import { CiReceipt } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLaptop } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiMobile1 } from "react-icons/ci";
import "./AboutDeveloper.css";

const AboutDeveloper = () => {
  return (
    <div className="About_Developer">
      <Navbar />
      <SearchBar />

      <div className="about_dev_top">
        <h3>About The Developer</h3>
        <div className="dev_image">
          <img src={mydp} alt="" />
        </div>
      </div>
      <div className="about_me">

        <div className="from">
          <div>
            <CiUser />
            <p>Name</p>
          </div>
          <h4>Shah Mir</h4>
        </div>

        <div className="from">
          <div>
            <CiMail />
            <p>Email</p>
          </div>
          <h4>c.engineer9925@gmail.com</h4>
        </div>

        <div className="from">
          <div>
            <CiMobile1 />
            <p>Contact</p>
          </div>
          <h4>+92347 4641042</h4>
        </div>

        <div className="from">
          <div>
            <CiLaptop/>
            <p>Work As</p>
          </div>
          <h4>Mern Stack Developer</h4>
        </div>

        <div className="from">
          <div>
            <CiReceipt/>
            <p>Studying</p>
          </div>
          <h4>Bs Software Eng. at UO</h4>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;

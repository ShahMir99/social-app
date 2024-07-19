import React, { useState } from "react";
import "./CreateNew.css";
import Navbar from "../../Components/Navbar/Navbar";
import { MdKeyboardBackspace } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import defaultUser from "../../image/defaultDp.png";
import { useSelector, useDispatch } from "react-redux";
import { CreatePost } from "../../Actions/PostsAction";
import { useRef } from "react";
import PreLoader from "../../Components/PreLoader/PreLoader";

const CreateNew = () => {
  const Ref = useRef();
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.authData);
  const {Message , Loading , error } = useSelector((state) => state.Posts);

  const [PostData, SetPostData] = useState({
    postContent: "",
    postStatus: "Public",
    PostImage: null,
  });

  const convertImageToBase64 = (e) => {
    let File = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        SetPostData({ ...PostData, PostImage: reader.result });
      }
    };
  };

  const onchnageHandler = (e) => {
    const { name, value } = e.target;
    SetPostData((PreVal) => {
      return { ...PreVal, [name]: value };
    });
  };
  const crearForm = () => {
    SetPostData({
      postContent: "",
      postStatus: "Public",
      PostImage: null,
    });
  };

  const submitPost = () => {
    Dispatch(CreatePost({ ...PostData, user: user?._id }));
    crearForm();
  };
  


  return (
    <>
      {Loading ? (
        <PreLoader />
      ) : (
        <div className="Create_new">
          <Navbar />
          <div className="Create_post_head">
            <div className="backspace">
              <MdKeyboardBackspace onClick={() => navigate(-1)} />
              <button
                type="submit"
                disabled={PostData.PostImage ? "" : "disabled"}
                onClick={submitPost}
                style={{ background: PostData.PostImage ? "" : "#9495b3" }}
              >
                New Post
              </button>
            </div>
            <div className="content_part">
              <div className="creatorImage">
                <img
                  src={user.profile ? user.profile.url : defaultUser}
                  alt="user"
                />
                <div className="select">
                  <select name="postStatus" onChange={onchnageHandler}>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div className="Add_image">
                  <BsImage onClick={() => Ref.current.click()} />
                  <input
                    type="file"
                    ref={Ref}
                    onChange={convertImageToBase64}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="writting__part">
              <textarea
                type="text"
                value={PostData.postContent}
                name="postContent"
                onChange={onchnageHandler}
                placeholder="What's happening ?"
                style={{ height: PostData?.PostImage ? "100px" : "200px" }}
              ></textarea>
              <img src={PostData.PostImage} alt="" width="100%" />
            </div>
            {error && (
              <span className="error_span">Slow Internet Connection</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNew;

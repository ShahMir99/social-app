import React from "react";
import "./Comments.css";
import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import CommentPreLoader from "../../Components/CommentPreLoader/CommentPreLoader";
import { MdKeyboardBackspace } from "react-icons/md";
import UserComment from "../../Components/UserComment/UserComment";
import { useDispatch, useSelector } from "react-redux";
import {submitComment } from "../../Actions/PostsAction";

const CommentModel = ({ modalOpened, setModalOpened, currentPost }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);
  const {Post , Loading } = useSelector((state) => state.singlePost);
  const [commentVal, setComment] = useState(null);

  const submitCom = () => {
    dispatch(submitComment(currentPost._id , commentVal, user._id));
    setComment("");
  };

  return (
    <>
      <Modal
        onClose={() => setModalOpened(false)}
        opened={modalOpened}
        fullScreen
      >
        <div className="Post_comment_div">
          <div className="Comments_backspace">
            <MdKeyboardBackspace onClick={() => setModalOpened(false)} />
            <h4>Comments</h4>
          </div>

          {Loading ? (
            <CommentPreLoader Post={Post}/>
          ) : (
            <>
              {Post.Comments &&
                Post.Comments.map((comments) => {
                  return (
                    <div className="comment_body">
                      <UserComment comments={comments} PostID={Post._id}/>
                    </div>
                  );
                })}

              <div className="write_comment">
                <input
                  type="text"
                  name="comment"
                  value={commentVal}
                  placeholder="Add a comment..."
                  onChange={(e) => setComment(e.target.value)}
                  autoComplete="off"
                />
                <button
                  onClick={submitCom}
                  disabled={commentVal ? "" : "disabled"}
                >
                  Post
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CommentModel;

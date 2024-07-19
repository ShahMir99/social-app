import React from "react";
import "./UserComment.css";
import moment from "moment";
import defaultDp from "../../image/defaultDp.png";
import { MdVerified } from "react-icons/md";
import {useDispatch , useSelector} from "react-redux"
import { TiDelete } from "react-icons/ti";
import { DeleteComment } from "../../Actions/PostsAction";

const UserComment = ({ comments , PostID}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth.authData)


  const deleteComemnt = (PostID , commentID) => {
    dispatch(DeleteComment(PostID , commentID))
  }
  return (
    <div className="UserComment">
      <div className="image">
        <img
          src={comments.user.profile ? comments.user.profile.url : defaultDp}
          alt="user "
        />
      </div>
      <div className="comment_content_div">
        <div className="comment_userInfo">
          <div>
            <h4>
              {comments.user?.name}&nbsp;
              {comments.user?.isverify ? (
                <MdVerified style={{ color: "#3575c9", fontSize: "15px" }} />
              ) : (
                ""
              )}
            </h4>
            <span>{moment(comments.commentedAt).fromNow()}</span>
          </div>
          {comments.user._id === user._id || user.isverify === true ? <TiDelete onClick={() => deleteComemnt(PostID , comments._id)}/> : ""}
        </div>
        <div className="commentContent">
          <p>{comments.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;

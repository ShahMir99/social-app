import React from "react";
import "./posts.css";
import Post from "./Post/Post";

const Posts = ({ posts, profile }) => {

  
  return (
    <div className="posts">
      {profile ? (posts.map((data) => {
            return <Post data={data} key={data._Id} />;
          })
      ) : (
        posts
          .map((data) => {
            return <Post data={data} key={data._Id} />;
          })
      )}
    </div>
  );
};

export default Posts;

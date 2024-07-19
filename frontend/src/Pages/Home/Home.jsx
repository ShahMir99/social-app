import React from "react";
import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Posts from "../../Components/Posts/Posts";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./Home.css";
import NoPost from "../../image/NaN.png"
import {useDispatch, useSelector } from "react-redux";
import PreLoader from "../../Components/PreLoader/PreLoader";
import { PostAction } from "../../Actions/PostsAction";

const Home = () => {
  const dispatch = useDispatch();
  const { Post, Loading } = useSelector((state) => state.Posts);
  const {user} = useSelector((state) => state.auth.authData);

  useEffect(() => {
    dispatch(PostAction(user._id));
  }, [dispatch , user._id]);

  return (
    <>
      {Loading ? (
        <PreLoader />
      ) : (
        <div className="Home">
          <Navbar />
          <SearchBar />
          {Post?.length > 0 ? (
            <Posts posts={Post} />
          ) : (
            <div className="No_mainpage_post"><img src={NoPost} alt="No Post" /></div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;

import User from "../Models/userModel.js";
import POST from "../Models/postModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import SearchUser from "../Utils/SearchApi.js";
import cloudinary from "cloudinary";

export const userRegister = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (!name || !username || !password) {
      return res.status(402).json({ message: "Please Fill Complete Fields" });
    }
    const existingUser = User.findOne({ username });

    if (!existingUser)
      return res.status(300).json({ message: "User Already Exist" });

    const RegisterUser = await User.create(req.body);

    const token = jwt.sign(
      { username: RegisterUser.username, id: RegisterUser._id },
      "mernstackdeveloper",
    );

    res.status(201).json({ user: RegisterUser, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const RegisterUser = await User.findOne({ username });

    if (!RegisterUser)
      return res.status(404).json({ message: "User Does'Exist" });

    if (RegisterUser.password !== password)
      return res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { username: RegisterUser.username, id: RegisterUser._id },
      "mernstackdeveloper",
      { expiresIn: "144h" }
    );

    res.status(201).json({ user: RegisterUser, token });
  } catch (error) {
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

export const userProfile = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No User With That Id");

  try {
    const profile = await User.findById({ _id });
    const profilePost = await POST.find({user : _id}).populate('user')
    profilePost.sort((a , b) => b.createdAt - a.createdAt)
    if (!profile) return res.status(404).send("No Post With That Id");
    res.status(201).json({profile , profilePost});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const _id = req.params.id;

    if (!req.body.cover && req.body.profile) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.profile, {
        folder: "SocialMedia",
      });
      const Profile = {
        url: myCloud.url,
        secure_url: myCloud.secure_url,
      };
      req.body.profile = Profile;

      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      return res.status(200).send(user);
    }

    if (req.body.cover && !req.body.profile) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.cover, {
        folder: "SocialMedia",
      });

      const Cover = {
        url: myCloud.url,
        secure_url: myCloud.secure_url,
      };
      req.body.cover = Cover;

      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      res.status(200).send(user);
    }
    if (req.body.cover && req.body.profile) {
      const myprofile = await cloudinary.v2.uploader.upload(req.body.profile, {
        folder: "SocialMedia",
      });
      const Profile = {
        url: myprofile.url,
        secure_url: myprofile.secure_url,
      };
      req.body.profile = Profile;

      const mycover = await cloudinary.v2.uploader.upload(req.body.cover, {
        folder: "SocialMedia",
      });

      const Cover = {
        url: mycover.url,
        secure_url: mycover.secure_url,
      };
      req.body.cover = Cover;

      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      return res.status(200).send(user);
    }
    if (!req.body.cover && !req.body.profile) {
      const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
      return res.status(200).send(user);
    }
  } catch (err) {
    res.status(499).json(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {

    const Searchusers = new SearchUser(User.find(), req.query).searchedUser();
    const users = await Searchusers.query;
    users.sort((a , b) => b.createdAt - a.createdAt)
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const followUser = async (req, res) => {


  try {
    const id = req.params.id;
    const { _id } = req.body;

    if (_id === id) {
      res.status(403).json("Action forbiden");
    } else {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(_id);
      
      if (!followUser.followers.includes(_id)) {
        followUser.followers.push(_id)
        followingUser.following.push(id)

        const followeduser = await followUser.save();
        await followingUser.save();
        return res.status(200).json(followeduser);
      } else {
        res.status(403).json("User is Already Followed");
      }
    }
  } catch (err) {
    res.json({ err: err.message });
  }
};


export const unFollowUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { _id } = req.body;

    if (_id === id) {
      res.status(403).json("Action forbiden");
    } else {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(_id);

      if (followUser.followers.includes(_id)) {
        followUser.followers.pull(_id)
        followingUser.following.pull(id)
        const followeduser = await followUser.save();
        await followingUser.save();
        
        return res.status(200).json(followeduser);

      } else {
        res.status(403).json("User is Not Followed By You");
      }
    }
  } catch (err) {
    res.json({ err: err.message });
  }
};
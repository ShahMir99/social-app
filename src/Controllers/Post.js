import mongoose from "mongoose";
import POST from "../Models/postModel.js";
import User from "../Models/userModel.js";
import cloudinary from "cloudinary";

export const singlepost = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id).populate(
      "user Comments.user"
    );
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const USER = await User.findById(req.params.id);
    const userposts = await POST.find({ user: req.params.id }).populate(
      "user Comments.user"
    );

    const AllPost = await POST.find({
      user: {
        $in: USER.following,
      },
    }).populate("user Comments.user");

    res
      .status(201)
      .json([
        ...AllPost.concat(userposts).sort((a, b) => b.createdAt - a.createdAt),
      ]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPost = async (req, res) => {
  try {
    const { postContent, postStatus, user } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.PostImage, {
      folder: "SocialMedia",
    });

    const newPost = new POST({
      postContent,
      postStatus,
      user,
      postImages: {
        imageUrl: myCloud.secure_url,
        public_id: myCloud.public_id,
      },
    });
    const result = await newPost.save();
    const finduser = await User.findById(user);

    res.status(201).json({
      Message: "Post Create Successfully",
      result: {
        ...result._doc,
        user: finduser,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post With That Id");

  try {
    const findDoc = await POST.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).send(findDoc);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post With That Id");

  try {
    const findDoc = await POST.findByIdAndDelete(_id);
    res.status(200).send(findDoc._id);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

export const LikePost = async (req, res) => {
  const id = req.params.id;
  const { userID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post With That Id");

  try {
    const post = await POST.findById(id).populate(
      "user",
      "name profile isverify"
    );

    if (!post.likeCounts.includes(userID)) {
      post.likeCounts.push(userID);
      const savepost = await post.save();

      res.status(200).json({ Message: "Post like Successfully", savepost });
    } else {
      post.likeCounts.pull(userID);
      const savepost = await post.save();
      res.status(200).json({ Message: "Post Unlike Successfully", savepost });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const comment = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post With That Id");

  try {
    const post = await POST.findById(id);
    post.Comments.push(req.body);
    const result = await post.save();
    const respone = result.Comments[result.Comments.length - 1];
    const user = await User.findById(respone.user);

    const userComment = {
      user: {
        profile: {
          url: user.profile.url,
          secure_url: user.profile.secure_url,
        },
        name: user.name,
        isverify: user.isverify,
      },

      comment: respone.comment,
      commentedAt: respone.commentedAt,
    };

    res.status(200).json(userComment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const findPost = await POST.findByIdAndUpdate(
      { _id: postId },
      { $pull: { Comments: { _id: req.body.commentId } } },
      { new: true }
    );
    res.status(200).json("Comment Deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

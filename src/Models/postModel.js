import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  postContent: {
    type: String,

  },
  postStatus: {
    type: String,
    required: [true, "Please Fill All Form"],
  },

  postImages: {
    imageUrl: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  likeCounts: [],

  Comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      comment: {
        type: String,
      },
      commentLike: [],
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const POST = mongoose.model("Post", postSchema);

export default POST;

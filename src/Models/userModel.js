import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  followers: [],
  following: [],
  profile: {
    url: {
      type: String
    },
    secure_url: {
      type: String
    },
  },
  cover: {
    url: {
      type: String
    },
    secure_url: {
      type: String
    },
  },

  isverify: {
    type: Boolean,
    default: false,
  },
  about: String,
  Relationship: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

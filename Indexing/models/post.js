const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    caption: {type:String, required:true},
    hashtags: {type: [String] , default: []},
    status: {type:String, enum:['published', 'draft', 'archived'], default:'draft'},
    likesCount: {type:Number},
    isDeleted: {type:Boolean},
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

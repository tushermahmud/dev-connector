const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text:{
    type: String
  },
  name:{
    type: String,
    required: true
  },
  avater:{
    type:String
  },
  likes:[{
      user:{
          type: Schema.Types.ObjectId,
          ref:"User"
      }
  }],
  comments:[{
      user:{
        type:Schema.Types.ObjectId,
        ref:"User"
      },
      text:{
        type:String,
        required:true
      },
      name:{
        type:String,
      },
      avater:{
        type:String
      },
      date:{
        type:Date,
        default:Date.now()
      }
  }],
  date:{
    type:Date,
    default:Date.now()
  }
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;

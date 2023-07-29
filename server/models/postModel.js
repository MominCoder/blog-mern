import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likesCount: {
        type: [String],
        default:[]
    },
    comments: {
        type: [String],
        default:[]
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
});

const PostModel = mongoose.model("PostModel", postSchema);
export default PostModel;
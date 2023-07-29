import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostModel.countDocuments({});

    const posts = await PostModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    return res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostModel.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } } ],
    });

    return res.json(posts);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostModel({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post exist with such id.");

  const updatedPost = await PostModel.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  return res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post exist with such id.");

  await PostModel.findByIdAndRemove(id);

  return res.json({ message: "Blog deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId)
    return res.json({ message: "Not authenticated to like the post" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post exist with such id.");

  const post = await PostModel.findById(id);

  const index = post.likesCount.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likesCount.push(req.userId);
  } else {
    post.likesCount = post.likesCount.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });

  return res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostModel.findById(id);

  post.comments.push(value);

  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  CircularProgress,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";

import moment from "moment";
import CommentSection from "./CommentSection.jsx";
import { getPost, getPostsBySearch } from "../../actions/posts.js";

export const PostDeatils = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: "", tags: post?.tags.join(",") }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts && posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            borderRadius: "20px",
            margin: "10px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px"
            }}
          >
            <div style={{ width: "50%" }}>
              <Typography variant="h3" component="h2">
                {post?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {post?.tags.map((tag, i) => (
                  <Link
                    key={i}
                    to={`/tags/${tag}`}
                    style={{ textDecoration: "none", color: "#3f51b5" }}
                  >
                    {` #${tag} `}
                  </Link>
                ))}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                {post.message}
              </Typography>
              <Typography variant="h6">
                Created by:
                <Link
                  to={`/creators/${post.name}`}
                  style={{ textDecoration: "none", color: "#3f51b5" }}
                >
                  {` ${post.name}`}
                </Link>
              </Typography>
              <Typography variant="body1">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>
            <figure style={{ width: "50%" }}>
              <img
                style={{
                  height: "auto",
                  width: "100%",
                  maxHeight: "600px",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
                src={post.selectedFile || `https://placehold.co/400?text=""`}
                alt={post.title}
              />
            </figure>
          </div>

          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
      </div>
      {recommendedPosts?.length > 0 && (
        <div style={{ margin: "10px", flex: 1, borderRadius: "20px" }}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div style={{ display: "flex", gap: "20px" }}>
            {recommendedPosts.map(
              ({ title, name, message, likesCount, selectedFile, _id }) => (
                <div
                  style={{
                    width: `${100 / recommendedPosts.length}%`,
                    cursor: "pointer",
                  }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likesCount?.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

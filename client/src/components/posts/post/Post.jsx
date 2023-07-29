import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";

import {
  ThumbUp,
  ThumbUpAltOutlined,
  Delete,
  MoreVertRounded,
} from "@mui/icons-material";

import { deletePost, likePost } from "../../../actions/posts.js";

export default function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placehodlerSrc = `https://placehold.co/400?text=""`;

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const {
    _id,
    title,
    name,
    message,
    likesCount,
    selectedFile,
    tags,
    updatedAt,
    createdAt,
  } = post;

  const Likes = () => {
    if (likesCount.length > 0) {
      return likesCount.slice(-1).map((like) =>
        like === user?.id ? (
          <span key={like} style={{ display: "flex", alignItems: "center" }}>
            <ThumbUp fontSize="small" />
            &nbsp;
            {likesCount.length > 2
              ? `You and ${likesCount.length - 1} others`
              : `${likesCount.length} like${likesCount.length > 1 ? "s" : ""}`}
          </span>
        ) : (
          <span key={like} style={{ display: "flex", alignItems: "center" }}>
            <ThumbUpAltOutlined fontSize="small" />
            &nbsp;
            {likesCount.length} {likesCount.length === 1 ? "Like" : "Likes"}
          </span>
        )
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card
      raised
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <div style={{cursor: "pointer"}} onClick={openPost}>
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
          image={selectedFile ? selectedFile : placehodlerSrc}
          title={title}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
            zIndex: 2,
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        {user?.id === post?.creator && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 5,
            }}
          >
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(_id);
              }}
            >
              <MoreVertRounded fontSize="small" />
            </Button>
          </div>
        )}
        <div
          style={{
            margin: "20px 0",
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {tags.map((tag, i) => (
              <span key={i}>#{tag} </span>
            ))}
          </Typography>

          <Typography variant="h5">{title}</Typography>

          <Typography
            sx={{
              padding: 0,
              fontSize: "14px",
              lineClamp: 2,
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {message}
          </Typography>
        </div>
      </div>
      <CardActions
        sx={{
          marginBottom: "20px",
          padding: "0 16px",
          justifyContent: "space-between",
          fontSize: "10px",
        }}
      >
        <Button
          size="small"
          color="primary"
          disabled={!user}
          sx={{ p: 0 }}
          onClick={() => dispatch(likePost(_id))}
        >
          <Likes />
        </Button>
        {user?.id === post?.creator && (
          <Button
            size="small"
            color="primary"
            sx={{ p: 0 }}
            onClick={() => dispatch(deletePost(_id))}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

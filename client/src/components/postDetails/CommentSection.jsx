import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.name}: ${comment}`, post._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "200px",
            width:"60%",
            overflowY: "auto",
            marginRight: "30px",
          }}
        >
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.length < 1 && "Be the first to comment!"}
          {comments.length > 1 &&
            comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))}
          <div ref={commentsRef} />
        </div>
        {user?.name && (
          <div style={{ width: "40%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

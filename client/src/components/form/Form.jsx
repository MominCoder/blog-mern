import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { createPost, updatePost } from "../../actions/posts.js";
import { useNavigate } from "react-router-dom";

export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) => currentId ? state?.posts?.posts.find((p) => p._id === currentId) : null );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPost({ ...postData, name: user?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentId, navigate, { ...postData, name: user?.name }));
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "null",
    });
  };

  if (!user?.name) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" align="center">
          Please sign in to create a blog, like and comment on other blogs.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6}>
      <form
        autoComplete="off"
        noValidate
        
        style={{
          marginBottom: "30px",
          padding:"20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap:"10px"
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Edit` : `Create`} a blog
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
        ></TextField>

        <div
          style={{
            width: "100%",
            overflow: "hidden"
          }}
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import Post from "./post/Post.jsx";

export default function Posts({ setCurrentId }) {
  const {posts, isLoading} = useSelector((state) => state?.posts);

  if (!posts.length && !isLoading) return "No posts...";

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          sx={{ color: 'red' }}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts &&
            posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={4} >
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
}

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
  Chip,
  Button,
} from "@mui/material";

import Posts from "../posts/Posts.jsx";
import Form from "../form/Form.jsx";
import Paginate from "../Paginate.jsx";
import { getPostsBySearch } from "../../actions/posts.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = (e) => {
    e.preventDefault();

    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter") {
      setTags([...tags, tagValue.trim()]);
      setTagValue("");
    }
  };

  const handleTagDelete = (chipToDelete) => () => {
    setTags((tags) => tags.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          sx={{
            display: "flex",
          }}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
            <AppBar
              position="static"
              color="inherit"
              sx={{
                my: 2,
                p: 2,
                borderRadius: 1,
                display: "flex",
              }}
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search blogs"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                name="tagSearch"
                sx={{
                  my: 2,
                }}
                fullWidth
                variant="outlined"
                label="Search tags"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={handleKeyDown}
                maxRows={3}
                InputProps={{
                  startAdornment: tags.map((item, i) => (
                    <Chip
                      key={i}
                      label={item}
                      onDelete={handleTagDelete(item)}
                      size="small"
                      style={{ fontSize: "12px" }}
                    />
                  )),
                }}
              />
              <Button
                onClick={(e) => searchPost(e)}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import { getPosts } from "../actions/posts.js";

const Paginate = ({page}) => {
  const dispatch = useDispatch();
  
  const {totalPages} = useSelector((state) => state.posts);
  
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      sx={{
        py: 1,
        justifyContent: "space-around",
      }}
      count={totalPages}
      page={Number(page) || 1}
      color="primary"
      size="small"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item?.page}`} />
      )}
    />
  );
};

export default Paginate;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import decode from "jwt-decode";
import { LOGOUT } from "../../constants/actionTypes.js";
import { deepPurple } from "@mui/material/colors";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      sx={{
        margin: "30px 0",
        padding: "0 30px",
        borderRadius: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      position="static"
      color="inherit"
    >
      <div
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          to={"/"}
          sx={{
            color: "rgba(0,183,255, 1)",
            textDecoration: "none",
          }}
          variant="h4"
          align="center"
        >
          Blogs
        </Typography>
      </div>
      <Toolbar>
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems:"center",
              columnGap:"20px"
            }}
          >
            <Avatar
              sx={{
                backgroundColor: deepPurple[500],
              }}
              src={user?.imgUrl}
              alt={user?.name}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user?.name}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to={"/auth"}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

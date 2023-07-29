import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import Input from "./Input.jsx";
import { login, signUp } from "../../actions/auth.js";


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({});

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsLoggedIn((prev) => !prev);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          margin: "30px 0",
          padding: "30px",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isLoggedIn ? "Signup" : "Login"}</Typography>
        <form
          style={{
            marginTop:"30px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isLoggedIn && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isLoggedIn && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              margin: "15px 0",
            }}
          >
            {isLoggedIn ? "Signup" : "Login"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isLoggedIn
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

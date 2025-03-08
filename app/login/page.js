"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import styles from "./Login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication
    if (username === "user" && password === "password") {
      dispatch(login());
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
      <Container className={styles.container} maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleLogin}
          className={styles.form}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
  );
};

export default Login;

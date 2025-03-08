"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addTodo } from "../../store/todoSlice";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import withAuth from "../components/withAuth";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      priority,
      status: "open",
    };

    dispatch(addTodo(newTask));
    setTask("");
    setPriority("Medium");
    setOpenSnackbar(true);

    // Navigate to the main route after a short delay
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ pt: "64px", pb: "24px" }}>
      <Box
        component="form"
        onSubmit={handleAddTask}
        sx={{
          mt: "32px",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          component="h1"
          gutterBottom
          sx={{ mb: 0, fontSize: "32px", fontWeight: "bold" }}
        >
          Add New Task
        </Typography>
        <TextField
          label="Task"
          variant="outlined"
          fullWidth
          margin="normal"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Task
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#98FB98" }}
        >
          Task added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default withAuth(TaskInput);

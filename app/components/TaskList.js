"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodoStatus } from "../../store/todoSlice";
import { Container, Typography, List, Snackbar, Alert } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDeleteTask = (id, text) => {
    dispatch(removeTodo(id));
    setSnackbarMessage(`Item "${text}" has been deleted successfully!`);
    setOpenSnackbar(true);
  };

  const handleMarkAsCompleted = (id) => {
    dispatch(updateTodoStatus({ id, status: "completed" }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const openTodos = todos
    .filter((todo) => todo.status === "open")
    .sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  return (
    <Container maxWidth="sm" sx={{ p: "0 !important", mt: "12px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
        Pending Tasks
      </Typography>
      {openTodos.length === 0 ? (
        <Typography variant="body1" sx={{ mt: "12px", color: "red" }}>
          No pending tasks found!
        </Typography>
      ) : (
        <List sx={{ mt: "8px", p: "0 !important" }}>
          {openTodos.map((todo) => (
            <TaskItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTask}
              onComplete={handleMarkAsCompleted}
            />
          ))}
        </List>
      )}
      <Typography sx={{ fontWeight: "bold", fontSize: "18px", mt: "24px" }}>
        Completed Tasks
      </Typography>
      {completedTodos.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
          No completed tasks found!
        </Typography>
      ) : (
        <List sx={{ mt: "8px", p: "0 !important" }}>
          {completedTodos.map((todo) => (
            <TaskItem key={todo.id} todo={todo} onDelete={handleDeleteTask} />
          ))}
        </List>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={12000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#98FB98" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskList;

"use client";

import React from "react";
import { ListItem, ListItemText, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const TaskItem = ({ todo, onDelete, onComplete }) => {
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      <ListItemText
        primary={todo.text}
        secondary={`Priority: ${todo.priority}`}
        sx={todo.status === "open" ? {} : { textDecoration: "line-through" }}
      />
      <Box>
        {todo.status === "open" && (
          <IconButton
            edge="end"
            aria-label="complete"
            onClick={() => onComplete(todo.id)}
          >
            <CheckIcon />
          </IconButton>
        )}
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(todo.id, todo.text)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskItem;

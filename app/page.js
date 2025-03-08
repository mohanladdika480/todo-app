"use client";

import { useRouter } from "next/navigation";
import { Container, Box, Button, Typography } from "@mui/material";
import withAuth from "./components/withAuth";
import TaskList from "./Components/TaskList";

const TodoList = () => {
  const router = useRouter();

  const handleNavigateToAddTask = () => {
    router.push("/TaskInput");
  };

  return (
    <Container maxWidth="sm" sx={{ pt: "64px", pb: "24px" }}>
      <Box
        sx={{
          mt: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          gutterBottom
          sx={{ mb: 0, fontSize: "32px", fontWeight: "bold" }}
        >
          Todo List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ maxWidth: "120px" }}
          onClick={handleNavigateToAddTask}
        >
          Add Task
        </Button>
      </Box>
      <TaskList />
    </Container>
  );
};

export default withAuth(TodoList);

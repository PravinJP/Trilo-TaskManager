import { useState, useEffect } from "react";
import taskService from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all tasks
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks(); // GET /api/tasks/all-tasks
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task and refresh tasks list
  const addTask = async (taskData) => {
    try {
      await taskService.createTask(taskData); // POST /api/tasks/create-task
      await loadTasks(); // 🔁 Refresh the task list automatically
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      await taskService.updateTask(id, taskData); // PUT /api/tasks/:id
      await loadTasks(); // Refresh after update
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Delete task
  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id); // DELETE /api/tasks/:id
      await loadTasks(); // Refresh after delete
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return { tasks, loading, addTask, updateTask, removeTask, loadTasks };
};

export default useTasks;

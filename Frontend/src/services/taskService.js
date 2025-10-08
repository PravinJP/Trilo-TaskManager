import api from "./api";

// Matches your backend controller endpoints
const getAllTasks = async () => {
  const response = await api.get("/tasks/all-tasks");
  return response.data;
};

const createTask = async (taskData) => {
  const response = await api.post("/tasks/create-task", taskData);
  return response.data;
};

const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default { getAllTasks, createTask, updateTask, deleteTask };

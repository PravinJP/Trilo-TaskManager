import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "../../services/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for /edit-task/:id
  const location = useLocation(); // for state passed via navigate
  const isEditing = !!id || !!location.state?.task;

  // If editing via state
  const taskFromState = location.state?.task || {};

  const [title, setTitle] = useState(taskFromState.title || "");
  const [description, setDescription] = useState(taskFromState.description || "");
  const [status, setStatus] = useState(taskFromState.status || "To Do");
  const [priority, setPriority] = useState(taskFromState.priority || "Medium");
  const [dueDate, setDueDate] = useState(taskFromState.dueDate || "");
  const [tags, setTags] = useState(taskFromState.tags?.join(", ") || "");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch task if editing via URL
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/tasks/${id}`);
          const task = res.data;
          setTitle(task.title || "");
          setDescription(task.description || "");
          setStatus(task.status || "To Do");
          setPriority(task.priority || "Medium");
          setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
          setTags(task.tags?.join(", ") || "");
        } catch (err) {
          console.error("Failed to load task:", err);
          toast.error("Failed to load task");
          navigate("/tasks");
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [id, navigate]);

  // Fetch users for assignee dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (isEditing) {
        const taskId = id || taskFromState.id;
        await api.put(`/tasks/${taskId}`, taskData);
        toast.success("Task updated!");
      } else {
        await api.post("/tasks/create-task", taskData);
        toast.success("Task created!");
      }
      navigate(-1);
    } catch (err) {
      console.error("Failed to save task:", err);
      toast.error(isEditing ? "Failed to update task" : "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md mb-6 flex items-center gap-4">
        <ArrowLeftIcon
          className="w-6 h-6 cursor-pointer text-gray-700"
          onClick={() => navigate(-1)}
        />
        <div>
          <h2 className="text-xl font-bold">{isEditing ? "Edit Task" : "Create New Task"}</h2>
          <p className="text-gray-500 text-sm">
            {isEditing ? "Update task details" : "Add a new task to your list"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* Task Title */}
          <label className="text-sm font-medium text-gray-700">Task Title *</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Description */}
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Status */}
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority */}
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Due Date */}
          <label className="text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Tags */}
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            placeholder="work, urgent, personal"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <p className="text-gray-500 text-xs">Separate multiple tags with commas</p>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded flex items-center gap-1 ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;

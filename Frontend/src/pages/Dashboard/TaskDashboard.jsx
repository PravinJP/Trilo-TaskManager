import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

const TaskDashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const { tasks, removeTask } = useTasks();
  const navigate = useNavigate();

  if (loading) return <p className="p-6">Loading...</p>;
  if (!isAuthenticated) return navigate("/signin");

  const handleCreateTask = () => {
    navigate("/createtask"); // Navigate to full-page task creation
  };

  const handleEditTask = (task) => {
    navigate("/createtask", { state: { task } }); // Pass task for editing
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await removeTask(id);
    }
  };

  // Metrics
  const totalTasks = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "To Do").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const overdue = tasks.filter((t) => t.status === "Overdue").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tasks</h1>
          <p className="text-gray-600">Manage and organize your tasks</p>
        </div>
        <button
          onClick={handleCreateTask}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" /> Add Task
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <ClockIcon className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">To Do</p>
            <p className="text-xl font-bold">{pending}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">In Progress</p>
            <p className="text-xl font-bold">{inProgress}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-xl font-bold">{completed}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <PlusIcon className="w-6 h-6 text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-xl font-bold">{totalTasks}</p>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold">All Tasks ({totalTasks})</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks found.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleCreateTask}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TaskDashboard;

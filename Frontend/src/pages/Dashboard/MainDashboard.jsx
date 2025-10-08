import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import TaskDashboard from "./TaskDashboard";
import TaskCard from "../../components/TaskCard";
import MainNavbar from "../../components/MainNavbar";

import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const MainDashboard = () => {
  const { user, removeTask } = useAuth();
  const { tasks } = useTasks();

  const [activePage, setActivePage] = useState("Dashboard");

  const handleEditTask = (task) => {
    console.log("Edit task:", task);
    // navigate("/createtask", { state: { task } });
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await removeTask(id);
    }
  };

  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePage === "Dashboard" && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                Welcome back, {user?.username || "!"}
              </h1>
              <p className="text-gray-600">
                Here’s what’s happening with your tasks today.
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <CheckCircleIcon className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-gray-500 text-sm">Total Tasks</p>
                  <p className="text-xl font-bold">{totalTasks}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-xl font-bold">0</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <ClockIcon className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-gray-500 text-sm">Pending</p>
                  <p className="text-xl font-bold">0</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-gray-500 text-sm">Overdue</p>
                  <p className="text-xl font-bold">0</p>
                </div>
              </div>
            </div>

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
          </>
        )}

        {activePage === "Tasks" && <TaskDashboard />}
      </main>
    </div>
  );
};

export default MainDashboard;

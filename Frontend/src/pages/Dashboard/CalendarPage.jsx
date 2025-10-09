import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Calendar } from "lucide-react";
import useTasks from "../../hooks/useTasks";

const CalendarPage = () => {
  const { tasks, loading } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const navigate = useNavigate();

  // Helper: format date as YYYY-MM-DD
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Filter tasks by date
  const getTasksForDate = (date) => {
    const dateStr = formatDate(date);
    return tasks.filter((task) => task.dueDate?.split("T")[0] === dateStr);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setTasksForSelectedDate(getTasksForDate(date));
  };

  // Navigate to CreateTaskPage with selected date
  const handleCreateTaskForDate = (date) => {
    navigate("/createtask", { state: { dueDate: formatDate(date) } });
  };

  // Calendar logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const days = [];

  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++)
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-semibold py-2">
            {d}
          </div>
        ))}

        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="h-20 border"></div>;

          const tasksOfDay = getTasksForDate(day);
          const isSelected =
            selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={idx}
              className={`h-20 border p-1 cursor-pointer flex flex-col justify-between ${
                isSelected ? "ring-2 ring-blue-500" : "hover:bg-gray-100"
              }`}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex justify-between items-center">
                <span>{day.getDate()}</span>
                {tasksOfDay.length > 0 && (
                  <span className="text-xs bg-blue-600 text-white rounded-full px-1.5 py-0.5">
                    {tasksOfDay.length}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleCreateTaskForDate(day)}
                className="mt-1 text-xs bg-green-500 text-white rounded px-1 py-0.5 hover:bg-green-600"
              >
                + Task
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected date tasks */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          {selectedDate
            ? `Tasks on ${selectedDate.toLocaleDateString()}`
            : "Select a date"}
        </h2>
        {tasksForSelectedDate.length === 0 ? (
          <p>No tasks for this date</p>
        ) : (
          <ul className="space-y-2">
            {tasksForSelectedDate.map((task) => (
              <li key={task.id} className="p-2 border rounded">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm">{task.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;

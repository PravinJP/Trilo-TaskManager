import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import { generatePDFReport } from "../../utils/pdfGenerator";
import { toast } from "react-hot-toast";

// Heroicons
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const DailyReport = () => {
  const { user } = useAuth();
  const { tasks, loadTasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    productivity: 0,
    averageCompletionTime: 0,
  });

  // Load tasks on mount
  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  // Update reportData whenever tasks or selectedDate change
  useEffect(() => {
    if (!tasks || !user) return;

    // Filter tasks for current user
    const userTasks = tasks.filter((t) => t.userId === user.id);

    const dateStr = selectedDate.toISOString().split("T")[0];

    const tasksForDate = userTasks.filter((t) => {
      const createdDate = t.createdAt?.split("T")[0];
      const dueDate = t.dueDate?.split("T")[0];
      return createdDate === dateStr || dueDate === dateStr;
    });

    const totalTasks = tasksForDate.length;
    const completedTasks = tasksForDate.filter((t) => t.status === "completed").length;
    const pendingTasks = tasksForDate.filter((t) => t.status === "todo" || t.status === "in-progress").length;
    const overdueTasks = tasksForDate.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed").length;
    const productivity = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const completedWithTime = tasksForDate.filter((t) => t.status === "completed");
    const averageCompletionTime =
      completedWithTime.length > 0
        ? completedWithTime.reduce((sum, t) => {
            const created = new Date(t.createdAt);
            const completed = t.updatedAt ? new Date(t.updatedAt) : new Date();
            const hours = (completed - created) / (1000 * 60 * 60);
            return sum + Math.max(0.5, Math.min(hours, 24));
          }, 0) / completedWithTime.length
        : 0;

    setReportData({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      productivity,
      averageCompletionTime: Math.round(averageCompletionTime * 10) / 10,
    });
  }, [tasks, selectedDate, user]);

  // Functions for Status and Priority
  const getTasksByStatus = (status) => {
    if (!tasks || !user) return [];
    const userTasks = tasks.filter((t) => t.userId === user.id);
    const dateStr = selectedDate.toISOString().split("T")[0];
    return userTasks.filter((task) => {
      const createdDate = task.createdAt?.split("T")[0];
      const dueDate = task.dueDate?.split("T")[0];
      return (createdDate === dateStr || dueDate === dateStr) && task.status === status;
    });
  };

  const getTasksByPriority = (priority) => {
    if (!tasks || !user) return [];
    const userTasks = tasks.filter((t) => t.userId === user.id);
    const dateStr = selectedDate.toISOString().split("T")[0];
    return userTasks.filter((task) => {
      const createdDate = task.createdAt?.split("T")[0];
      const dueDate = task.dueDate?.split("T")[0];
      return (createdDate === dateStr || dueDate === dateStr) && task.priority === priority;
    });
  };

  const handleDownloadPDF = async () => {
    try {
      toast.loading("Generating PDF...", { id: "pdf-gen" });
      await generatePDFReport(reportData, selectedDate, user?.name || "User");
      toast.success("PDF downloaded successfully!", { id: "pdf-gen" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF", { id: "pdf-gen" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daily Report</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your productivity and task completion</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card icon={<ChartBarIcon className="h-6 w-6 text-blue-600" />} label="Total Tasks" value={reportData.totalTasks} />
        <Card icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />} label="Completed" value={reportData.completedTasks} />
        <Card icon={<ClockIcon className="h-6 w-6 text-yellow-600" />} label="Pending" value={reportData.pendingTasks} />
        <Card icon={<ExclamationCircleIcon className="h-6 w-6 text-red-600" />} label="Overdue" value={reportData.overdueTasks} />
      </div>

      {/* Task Status & Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StatusCard
          title="Task Status Breakdown"
          items={[
            { label: "Completed", value: getTasksByStatus("completed").length, color: "green" },
            { label: "In Progress", value: getTasksByStatus("in-progress").length, color: "blue" },
            { label: "To Do", value: getTasksByStatus("todo").length, color: "gray" },
          ]}
        />
        <StatusCard
          title="Priority Distribution"
          items={[
            { label: "High", value: getTasksByPriority("high").length, color: "red" },
            { label: "Medium", value: getTasksByPriority("medium").length, color: "yellow" },
            { label: "Low", value: getTasksByPriority("low").length, color: "green" },
          ]}
        />
      </div>
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex items-center gap-4">
    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const StatusCard = ({ title, items }) => {
  const colors = {
    green: "bg-green-600",
    blue: "bg-blue-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
    gray: "bg-gray-600",
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className={`${colors[item.color]} h-2 rounded-full`} style={{ width: `${Math.min(item.value, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyReport;

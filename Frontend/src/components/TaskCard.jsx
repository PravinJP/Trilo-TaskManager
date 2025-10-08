import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const dueDate = new Date(task.dueDate);
  const isOverdue = task.status !== "Completed" && dueDate < new Date();

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <div className="flex gap-2">
          <PencilIcon className="w-5 h-5 cursor-pointer text-blue-500" onClick={() => onEdit(task)}/>
          <TrashIcon className="w-5 h-5 cursor-pointer text-red-500" onClick={() => onDelete(task.id)}/>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <div className="flex gap-2 flex-wrap text-xs">
        {task.tags?.map(tag => (
          <span key={tag} className="bg-gray-200 px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <p className={`text-sm ${isOverdue ? "text-red-500" : "text-gray-500"}`}>
        Due: {task.dueDate?.slice(0,10)} {isOverdue && "(Overdue)"}
      </p>
      <p className="text-gray-400 text-xs">
        Created: {task.createdAt?.slice(0,10)} | Updated: {task.updatedAt?.slice(0,10)}
      </p>
    </div>
  );
};

export default TaskCard;

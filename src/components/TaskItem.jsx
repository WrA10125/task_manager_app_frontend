// import React from "react";

// export default function TaskItem({ task, onDelete, onEdit }) {
//   return (
//     <div className="flex items-center justify-between bg-white shadow p-4 rounded mb-3">
//       <div>
//         <p
//           className={`text-lg ${
//             task.completed ? "line-through text-gray-400" : "text-gray-800"
//           }`}
//         >
//           {task.title}
//         </p>
//         <p className="text-sm text-gray-500">
//           Status: {task.completed ? "Completed" : "Pending"}
//         </p>
//       </div>
//       <div className="flex gap-2">
//         <button
//           onClick={() => onEdit(task)}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(task._id)}
//           className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }



import React from "react";

export default function TaskItem({ task, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between bg-white shadow p-4 rounded mb-3">
      <div>
        <p
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </p>
        <p className="text-sm text-gray-600">
          Added by:{" "}
          <span className="font-medium">{task.userName || "Unknown"}</span>
        </p>
        <p className="text-sm text-gray-500">
          Status: {task.completed ? "Completed" : "Pending"}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

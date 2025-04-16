import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import TaskItem from "../components/TaskItem";
import Swal from "sweetalert2";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const tasksPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleAddTask = async () => {
    if (!newTitle.trim() || !newUserName.trim()) {
      Swal.fire("Error", "Please fill in both title and name", "error");
      return;
    }

    try {
      const res = await API.post(
        "/tasks",
        { title: newTitle, userName: newUserName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prev) => [...prev, res.data]);
      setNewTitle("");
      setNewUserName("");
      setShowAddModal(false);
      Swal.fire("Success", "Task added successfully", "success");
    } catch (err) {
      console.error("Add failed", err);
      Swal.fire("Error", "Failed to add task", "error");
    }
  };


  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks((prev) => prev.filter((task) => task._id !== id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditCompleted(task.completed);
  };

  const handleUpdateTask = async () => {
    try {
      const res = await API.put(
        `/tasks/${editingTask}`,
        { title: editTitle, completed: editCompleted },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === editingTask ? res.data : t))
      );
      setEditingTask(null);
      setEditTitle("");
      setEditCompleted(false);
      Swal.fire("Updated!", "Task updated successfully.", "success");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-xl mx-auto mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-orange-600 font-semibold text-center">
            Your Tasks
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Task
          </button>
        </div>

        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={startEdit}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* Edit Modal */}
        {editingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setEditingTask(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Edit Task
              </h3>
              <input
                type="text"
                className="border p-2 w-full mb-3"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <select
                className="border p-2 w-full mb-4"
                value={editCompleted ? "completed" : "pending"}
                onChange={(e) =>
                  setEditCompleted(e.target.value === "completed")
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
              placeholder="Enter task title"
            />

            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
              placeholder="Enter your name"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = (newTask) => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      const task = { ...newTask, id: Date.now() };
      setTasks(prev => [...prev, task]);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // sort by deadline then priority
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    if (dateA - dateB !== 0) return dateA - dateB;
    return a.priority - b.priority;
  });

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskForm onSave={handleAddOrUpdate} editingTask={editingTask} />

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.deadline}</td>
              <td>{task.priority}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

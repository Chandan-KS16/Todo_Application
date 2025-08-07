import { useEffect, useState } from "react";

export default function TaskForm({ onSave, editingTask }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(3);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDeadline(editingTask.deadline);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline) return;
    onSave({ title, deadline, priority: parseInt(priority) });
    setTitle("");
    setDeadline("");
    setPriority(3);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        required
      />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        {[1, 2, 3, 4, 5].map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
      <button type="submit">{editingTask ? "Update" : "Add"} Task</button>
    </form>
  );
}

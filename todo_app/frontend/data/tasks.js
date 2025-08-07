// frontend/data/tasks.js
let tasks = [
  {
    id: 1,
    title: "Initial Task",
    deadline: "2025-08-10T12:00",
    priority: 3
  }
];

module.exports = {
  getTasks: () => tasks.sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    if (dateA - dateB !== 0) return dateA - dateB;
    return a.priority - b.priority;
  }),

  addTask: (task) => {
    task.id = Date.now();
    tasks.push(task);
  },

  deleteTask: (id) => {
    tasks = tasks.filter(task => task.id !== id);
  },

  updateTask: (id, updated) => {
    tasks = tasks.map(task => task.id === id ? { ...task, ...updated } : task);
  }
};
// next.config.js
export const storage = {
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Failed to get item for key:", error);
      return null;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save Item:", e);
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  getAllTodos() {
    const todos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const todo = this.getItem(key);
      if (todo) todos.push(todo);
    }
    return todos;
  },
};

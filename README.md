# ✅ Todo List Web App – 8byte Front-End Intern Assignment

A clean, responsive Todo List app built for the 8byte Front-End Internship assignment.  
This app includes local storage, API integration, task filtering, drag-and-drop, modals, and responsive design.

---

## 🚀 Live Demo
🔗 [Click to View Deployed App](https://todo-list-web-app-chi.vercel.app/)

## 📁 GitHub Repository
🔗 [GitHub Repo](https://github.com/A-Mayank/TodoList_WebApp)

---

## ✅ Tasks Completed

| Task | Description |
|------|-------------|
| ✅ Task 1 | Add/delete/complete todos, localStorage, search, drag-and-drop |
| ✅ Task 2 | Fetched 10 sample todos from JSONPlaceholder API |
| ✅ Task 3 | Code review, fixed 4 key issues, refactored component |
| ✅ Task 4 | Responsive design (320px–1440px), smooth transitions |

---

## 🛠️ Task 3: Code Review & Refactor

### 🚨 Original Issues
1. **State mutated directly** with `splice()`
2. **Re-used same state array**, blocking re-renders
3. **Missing `key` prop** in `.map()` rendering
4. **Unstructured layout** (e.g., no accessible button tags)

---

### ✅ Refactored Fix

```jsx
const deleteTodo = (index) => {
  const updatedItems = items.filter((_, i) => i !== index);
  setItems(updatedItems);
};

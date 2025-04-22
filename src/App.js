import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import ApiTodos from './components/ApiTodos';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState(() => localStorage.getItem('activeTab') || 'local');

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(stored);
  }, []);

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Handle tab switching + persist tab state
  const handleTabChange = (value) => {
    setTab(value);
    localStorage.setItem('activeTab', value);
  };

  // Add todo
  const addTodo = (task) => {
    if (!task.trim()) {
      setShowModal(true);
      return;
    }
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>

      <div className="tab-buttons">
        <button
          className={`tab-button ${tab === 'local' ? 'active' : ''}`}
          onClick={() => handleTabChange('local')}
        >
          Local Todos
        </button>
        <button
          className={`tab-button ${tab === 'api' ? 'active' : ''}`}
          onClick={() => handleTabChange('api')}
        >
          API Todos
        </button>
      </div>

      {tab === 'local' ? (
        <div className="tab-content">
          <SearchBar value={search} onChange={setSearch} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo(newTask);
            }}
            style={{ marginBottom: '16px' }}
          >
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="search-bar"
            />
            <button type="submit">Add</button>
          </form>
          <TodoList todos={todos} setTodos={setTodos} search={search} />
          <Modal show={showModal} onClose={() => setShowModal(false)} />
        </div>
      ) : (
        <div className="tab-content">
          <ApiTodos />
        </div>
      )}
    </div>
  );
}

export default App;

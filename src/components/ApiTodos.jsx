import React, { useEffect, useState } from 'react';
import { fetchSampleTodos } from '../api/fetchTodos';

const ApiTodos = () => {
  const [apiTodos, setApiTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchSampleTodos();
      setApiTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filtered = showCompleted
    ? apiTodos
    : apiTodos.filter(todo => !todo.completed);

  return (
    <div>
      <h2>📡 Fetched Todos</h2>

      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        Show Completed
      </label>

      {loading && <p>Loading...</p>}

      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={loadTodos}>Retry</button>
        </div>
      )}

      <ul>
        {filtered.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            <strong>User:</strong> {todo.userId} <br />
            <strong>Task:</strong> {todo.title} <br />
            <strong>Status:</strong> {todo.completed ? '✅ Completed' : '❌ Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiTodos;

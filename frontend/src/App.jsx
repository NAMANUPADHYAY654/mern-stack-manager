import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckSquare } from 'lucide-react';
import './index.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // For testing UI without backend
  const MOCK_MODE = true; 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        throw new Error('Backend not connected');
      }
    } catch (error) {
      console.log('Using mock data since backend is not connected');
      if (MOCK_MODE) {
        setTasks([
          { _id: '1', title: 'Buy groceries', completed: false },
          { _id: '2', title: 'Finish project presentation', completed: true },
          { _id: '3', title: 'Call mom', completed: false }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      
      if (res.ok) {
        const newTask = await res.json();
        setTasks([newTask, ...tasks]);
      } else {
        throw new Error('Backend error');
      }
    } catch (error) {
      if (MOCK_MODE) {
        const newTask = { _id: Date.now().toString(), title, completed: false };
        setTasks([newTask, ...tasks]);
      }
    }
    setTitle('');
  };

  const toggleTask = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      });
      
      if (res.ok) {
        const updatedTask = await res.json();
        setTasks(tasks.map(t => t._id === id ? updatedTask : t));
      } else {
        throw new Error('Backend error');
      }
    } catch (error) {
      if (MOCK_MODE) {
        setTasks(tasks.map(t => t._id === id ? { ...t, completed: !t.completed } : t));
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== id));
      } else {
        throw new Error('Backend error');
      }
    } catch (error) {
      if (MOCK_MODE) {
        setTasks(tasks.filter(t => t._id !== id));
      }
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Tasky</h1>
        <p>Your sleek task management companion</p>
      </header>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn-add">
          <Plus size={20} />
          Add
        </button>
      </form>

      {isLoading ? (
        <div className="empty-state">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <CheckSquare size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <p>No tasks yet. Enjoy your day!</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id, task.completed)}
                />
                <span className="task-text">{task.title}</span>
              </div>
              <button 
                className="btn-delete" 
                onClick={() => deleteTask(task._id)}
                aria-label="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

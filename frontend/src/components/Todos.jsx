import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { text: newTodo })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
    setNewTodo('');  // Clear input
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button
          className="bg-blue-500 text-white p-2 mt-2"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="border p-2 my-2">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;

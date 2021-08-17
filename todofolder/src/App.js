import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    if (newTodo.text !== "") {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    }
  };

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <h1 className="head-title">TodoList created in ReactJS</h1>
      <div className="inner-container">
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="input-field"
            maxlength="25"
          />
          <button className="btn add">Add todo</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
                maxlength="25"
                placeholder="Edit text and submit"
                className="input-field submit-change"
              />
            ) : (
              <div className="card">
                <div className="card-text">
                  <div>{todo.text}</div>
                  <input
                    type="checkbox"
                    onChange={() => toggleComplete(todo.id)}
                    checked={todo.completed}
                    className="checkboxen"
                    maxlength="25"
                  />
                </div>
              </div>
            )}

            <div className="btn-container">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn"
                id="delete"
              >
                Delete
              </button>

              {todoEditing === todo.id ? (
                <button
                  onClick={() => editTodo(todo.id)}
                  className="btn submitEdit"
                >
                  Submit Edit
                </button>
              ) : (
                <button
                  onClick={() => setTodoEditing(todo.id)}
                  className="btn"
                  id="edit"
                >
                  Edit Todo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

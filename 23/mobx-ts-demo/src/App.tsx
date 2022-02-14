import React from 'react';
import './App.css';
import TodoApp from "./components/TodoApp";
import Todos from "./mobx/todo";

const todos = new Todos();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoApp todos={todos}/>
      </header>
    </div>
  );
}

export default App;

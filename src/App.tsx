//outer
import React from 'react';

//local
import './App.css';
import UserList from "./components/UserList";
import TodoList from "./components/TodoList";



function App() {
  return (
    <div className="body__container">
       <UserList/>
       <br/>
       <TodoList/>
    </div>
  );
}

export default App;

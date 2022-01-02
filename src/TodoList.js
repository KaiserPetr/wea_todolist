import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [ isEdit, setIsEdit ]= useState(null);
  const axios = require("axios");

  // načtění dat z jsonu
  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      });
  }, []);

  // přidání nového itemu do seznamu
  const addTodo = (todo) => {
    // eliminuje prebytecne mezery a prazdny retezec
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    setTodos([...todos, todo]);

    axios
      .post("http://localhost:8000/todos", todo)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update itemu
  const updateTodo = (id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text) ) {
      return;
    }

    setTodos((prev) => prev.map((item) => (item.id === id ? newValue : item)));
    axios
      .put("http://localhost:8000/todos/" + id, {
        text: newValue.text,
        complete: false, //pri zmene polozky se nastavi jako unfinished
      })
      .then((resp) => {
        console.log(resp.data);
        setIsEdit(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // odstraneni itemu
  const removeTodo = (id) => {
    setTodos([...todos].filter((todo) => todo.id !== id));

    axios
      .delete("http://localhost:8000/todos/" + id)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // oznaceni itemu jako hotovy
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
        axios
          .put("http://localhost:8000/todos/" + id, {
            text: todo.text,
            complete: todo.complete,
          })
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>TODO list</h1>
      <TodoForm onSubmit={isEdit ? updateTodo : addTodo} edit={isEdit}/>
      {isEdit ? <></> :
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        setEdit={(value) => {setIsEdit(value)}}
      />}
    </div>
  );
}

export default TodoList;

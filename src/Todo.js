import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import UserStore from "./stores/UserStore";

function Todo({ todos, completeTodo, removeTodo, updateTodo, setEdit }) {
  return todos.map((todo, index) => (
    <div
      className={todo.complete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      {/*pokud je uzivatel prihlasen, tak se zobrazi UD ikony a je povolena moznost oznacit item jako hotovy*/}
      <div key={todo.id} onClick={() => UserStore.isLoggedIn ? completeTodo(todo.id) : {} }>
        {todo.text}
      </div>
      <div className="icons" style ={{ display: UserStore.isLoggedIn ? "flex" : "none" }}>
        {todo.complete ? (
          <></>
        ) : (
          <AiFillEdit
            //pokud je item oznacen jako hotovy, tak jej nelze upravovat
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon"
          />
        )}
        <FaWindowClose
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;

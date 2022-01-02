import React, { useState, useEffect, useRef } from "react";
import UserStore from "./stores/UserStore";

function TodoForm(props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(props.edit ? props.edit.value : "");
  }, [props.edit]);

  const inputRef = useRef(null);

  //autofocus kurzoru
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    // zabrání refreshi celé stránky při přidání itemu
    e.preventDefault();
    if (props.edit) {
      props.onSubmit(props.edit.id, {
        id: props.edit.id,
        text: input,
        complete: false,
      });
    } else {
      props.onSubmit({
        // itemu vygeneruje nahodne id v rozsahu 1-10000
        id: Math.floor(Math.random() * 10000),
        text: input,
        complete: false,
      });
    }

    setInput("");
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update item"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add item"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
            style={{ display: UserStore.isLoggedIn ? "inline" : "none" }}
          />
          <button className="todo-button" style={{ display: UserStore.isLoggedIn ? "inline" : "none" }} >Add</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;

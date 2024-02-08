import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [toDoValue, setToDoValue] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const TEXTS_CONFIGURATION = {
    title: "ToDo List 📋",
    inputLabel: "!Write a todo 📝¡  ",
    placeholder: "Something to do...",
    textButton: "Create a ToDo ✨",
  };

  const addNewToDo = (newToDo) => {
    toDoList &&
      setToDoList([
        ...toDoList,
        {
          id: Math.random().toString(),
          toDo: newToDo,
        },
      ]);
    setToDoValue("");
  };

  const handleTextInputChange = (e) => {
    setToDoValue(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>{TEXTS_CONFIGURATION.title}</h1>
      <label htmlFor="toDo">
        {TEXTS_CONFIGURATION.inputLabel}
        <input
          placeholder={TEXTS_CONFIGURATION.placeholder}
          id="toDo"
          name="toDo"
          type="text"
          value={toDoValue}
          onChange={handleTextInputChange}
        />
      </label>
      <button type="button" name="toDo" onClick={() => addNewToDo(toDoValue)}>
        {TEXTS_CONFIGURATION.textButton}
      </button>
      <ol>
        {toDoList.map((toDoItem) => (
          <li key={toDoItem.id}>{toDoItem.toDo}</li>
        ))}
      </ol>
      <button type="button">Previous</button>
      <button type="button">Next</button>
    </div>
  );
};

export default App;

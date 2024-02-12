import logo from "./logo.svg";
import "./App.css";
import { forwardRef, useEffect, useRef, useState } from "react";

const TEXTS_CONFIGURATION = {
  title: "ToDo List 📋",
  inputLabel: "!Write a todo 📝¡  ",
  placeholder: "Something to do...",
  createButton: "Create a ToDo ✨",
  previousButton: "Previous",
  nextButton: "Next",
};

export const PaginatedList = forwardRef(({ toDoList, toDosQuantity }, ref) => {
  return (
    <>
      <ol ref={ref}>
        {toDoList.map(
          (toDoItem, index) =>
            index <= toDosQuantity - 1 && <li key={toDoItem.id}>{toDoItem.toDo}</li>
        )}
      </ol>
    </>
  );
});

const App = () => {
  const [toDoValue, setToDoValue] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [lastToDo, setLastToDo] = useState(false);
  const [firstPage, setFirtsPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [countLi, setCountLi] = useState(0);
  const listRef = useRef(null);
  const TODOS_PER_PAGE = 3;

  const isFirstPage = (firstToDo) => {
    if (!firstToDo) return;
    const indexToDo = toDoList?.findIndex((objeto) => objeto.toDo === firstToDo);
    if (indexToDo === 0 || toDoList.length === 0) {
      setFirtsPage(true);
    }
  };

  const addNewToDo = (newToDo) => {
    if (!newToDo) {
      console.error("You haven't written a to do.");
      return;
    }
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

  useEffect(() => {
    const firstChild = listRef?.current?.firstChild?.innerText;
    const lastChild = listRef?.current?.lastChild?.innerText;
    const counterElements = listRef?.current?.childElementCount;
    setCountLi(counterElements);
    isFirstPage(firstChild && firstChild);
    console.log("ListRefEffect-First", listRef?.current?.childElementCount);
    console.log("ListRefEffect-last", listRef?.current?.lastChild?.innerText);
    setLastToDo(lastChild && lastChild !== firstChild && lastChild !== "");
    console.log("lastToDo", lastToDo && lastToDo);
  }, [lastToDo, isFirstPage, countLi]);

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
        {TEXTS_CONFIGURATION.createButton}
      </button>
      <p>{firstPage && "firstPage"}</p>
      <p>{lastToDo && `${lastToDo}`}</p>
      <PaginatedList ref={listRef} toDoList={toDoList} toDosQuantity={TODOS_PER_PAGE} />
      <button type="button" disabled={!toDoValue}>
        {TEXTS_CONFIGURATION.previousButton}
      </button>
      <button
        type="button"
        disabled={countLi <= TODOS_PER_PAGE || !toDoList.length > TODOS_PER_PAGE}>
        {TEXTS_CONFIGURATION.nextButton}
      </button>
    </div>
  );
};

export default App;

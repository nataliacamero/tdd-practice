import logo from './logo.svg';
import './App.css';

function App() {
  const TEXTS_CONFIGURATION = {
    title: "TODO List",
    inputLabel: "!Write a todo¡  ",
    placeholder: 'Something to do...'
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>{TEXTS_CONFIGURATION.title}</h1>
      <label htmlFor="toDo">
        {TEXTS_CONFIGURATION.inputLabel }
        <input placeholder={TEXTS_CONFIGURATION.placeholder} id="toDo" type='text'/>
      </label >
      
      
    </div>
  );
}

export default App;

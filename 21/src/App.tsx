import './App.css';
import MemoCounter from "./hook-components/CounterMemo";

localStorage.setItem("name", "秋裤");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        hahahahaha
        <MemoCounter/>
      </header>
    </div>
  );
}

export default App;

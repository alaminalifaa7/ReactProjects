import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <img src={logo} className="App-logo" alt="logo" />
        </nav>
        <h1>Just Practicing afer a while</h1>
      </header>
      <section className="App-description">
        <ol>
          <li>I have an assessment coming up</li>
          <li>I like how slick react is!!</li>
          <li>I get excited about learning and doing exciting stuff</li>
        </ol>
      </section>
      <footer>
        <small>2022 development. All rights developed</small>
      </footer>
    </div>
  );
}

export default App;

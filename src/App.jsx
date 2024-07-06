import React from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <main className="outer-container">
      <div className="inner-container">
        <Form />
      </div>
      <div className="footer">
        <p>
          Made With 💚 by{" "}
          <a href="https://github.com/VictorKevz" target="_blank">
            Victor Kevz{" "}
          </a>
        </p>
      </div>
    </main>
  );
}

export default App;

import "./App.css";
import React, { useState } from "react";
import data from "./data.js";
import Flight from "./Flight";

function App() {
  const [flights, setFlights] = useState(data);
  return (
    <div className="container">
      <h3>Flight Search Simulator</h3>
      <section className="info">
        {flights.map((flight, index) => {
          return <Flight key={index} {...flight} />;
        })}
      </section>
    </div>
  );
}

export default App;

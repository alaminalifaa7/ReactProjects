import logo from "./logo.svg";
import React from "react";

export default function Header() {
  return (
    <header className="App-header">
      <nav className="nav">
        <img src={logo} className="App-logo" alt="logo" />
        <ul className="nav-items">
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

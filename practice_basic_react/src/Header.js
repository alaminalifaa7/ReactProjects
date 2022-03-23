import logo from "./logo.svg";
import React from "react";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="logo" />
      <h2 className="header-title"> Flight Search</h2>
    </header>
  );
}

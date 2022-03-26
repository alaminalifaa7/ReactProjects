import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Authors from "./Authors";

const limit = 5;
function App() {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [localStorageAuthors, setLocalStorageAuthors] = useState([]);
  let url = `https://api.quotable.io/authors?limit=${limit}&skip=${skip}`;
  async function getAuthors() {
    try {
      const response = await fetch(url);
      const authors = await response.json();
      console.log(authors);
      setAuthors(authors.results);
      setCurrentPage(authors.page);
      setTotalPage(authors.totalPages);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAuthors();
  }, [skip]);

  useEffect(() => {
    let storageValues = JSON.parse(localStorage.getItem("localStorageAuthors"));
    console.log(storageValues);
    if (storageValues) {
      console.log("setting authors from local");
      //localStorage.clear();
      setLocalStorageAuthors(storageValues);
    }
    console.log("getting authors from local");
    console.log(localStorageAuthors);
  }, []);

  const handleNext = () => {
    setSkip((skip) => (currentPage < totalPage ? skip + limit : skip));
  };
  const handlePrev = () => {
    setSkip((skip) => (currentPage > 1 ? skip - limit : skip));
  };
  return (
    <div className="container">
      <div className="routes">
        <Link to="/">
          <h3>Author List</h3>
        </Link>
        <Link to="/favorite">
          <h3>Favorite List</h3>
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Authors
              authors={authors}
              currentPage={currentPage}
              handleNext={handleNext}
              handlePrev={handlePrev}
              setLocalStorageAuthors={setLocalStorageAuthors}
              fromFav={false}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <Authors
              authors={localStorageAuthors}
              currentPage={currentPage}
              handleNext={handleNext}
              handlePrev={handlePrev}
              setLocalStorageAuthors={setLocalStorageAuthors}
              fromFav={true}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

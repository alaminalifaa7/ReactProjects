import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e3e521b4b9ecd4c45a807a2036b3a3cb";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setMovies(data.results);
      console.log(movies);
      return response;
    }
    fetchData();
  }, [API]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="movie-container">
      {movies.map((movie) => {
        return <Movie key={movie.id} {...movie} />;
      })}
    </div>
  );
}

export default App;

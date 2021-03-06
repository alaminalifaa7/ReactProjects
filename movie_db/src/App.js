import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const BASE_API = "https://api.themoviedb.org/3";
  const API_KEY = "&api_key=e3e521b4b9ecd4c45a807a2036b3a3cb";
  const API = `${BASE_API}/discover/movie?with_genres=18&primary_release_year=2014${API_KEY}`;

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

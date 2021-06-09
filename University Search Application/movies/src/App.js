import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

function App() {
  const [loading, setLoading] = useState(false);
  const [uni, setUni] = useState([]);
  const [country, setCountry] = useState("");

  const fetchActivity = async () => {
    setLoading(true);
    let url = `http://universities.hipolabs.com/search?country=${country}`;
    try {
      const response = await fetch(url);
      const universities = await response.json();
      setLoading(false);
      setUni(universities);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(country);
    fetchActivity();
  };
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Country Name"
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </form>
      <div>
        <p>If country name has two words, put a + sign in between</p>
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={country.length < 3}
        onClick={handleSubmit}
      >
        Search University
      </Button>
      <div>
        {uni.map((univ, index) => {
          const uniName = univ.name;
          const uniSite = univ.web_pages;
          return (
            <div>
              <h1 key={index}>
                {index} {uniName}
              </h1>
              <a href={uniSite}>{uniSite}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

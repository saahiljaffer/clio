import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function Search({ setTitle }) {
  const onChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <input
        onChange={onChange}
        type="text"
        id="textInput"
        placeholder="Movie Title"
      />
    </div>
  );
}

function Results({ title, page, updateNominated }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nominate = (event) => {
    var data = event.target.value;
    updateNominated((arr) => [...arr, `${arr.length}`]);
  };

  useEffect(() => {
    if (!title) return;
    if (title.length >= 3) {
      setLoading(true);
      fetch(
        `https://www.omdbapi.com/?s=${title}&apikey=b29472dd&type=movie&page=${page}`
      )
        .then((response) => response.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
    }
  }, [page, title]);

  if (title.length < 3)
    return <p>Please enter a search query of at least 3 characters</p>;

  if (loading) return <p>Loading...</p>;

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (!data) return null;

  console.log(data);

  if (data.Response === "False") return <p>Movie Not Found</p>;

  return (
    <div>
      <ul>
        {data.Search.map((data) => (
          <li key={data.imdbID}>
            {data.Title} - {data.Year}
            <Button onClick={nominate} variant="dark" value={data.imdbID}>
              Nominate
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Nominated({ nominated }) {
  const remove = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <ul>
        {nominated.map((movie) => (
          <li key={movie}>
            {movie.Title} - {movie.Year}
            <Button onClick={remove} variant="dark" value={movie.imdbID}>
              Nominate
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [nominated, updateNominated] = useState([]);

  return (
    <>
      <Search setTitle={setTitle} />
      <Results title={title} page={page} updateNominated={updateNominated} />
      <Nominated nominated={nominated} />
    </>
  );
}

export default App;

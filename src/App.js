import "./App.css";
import React, { useState, useEffect } from "react";

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

function Results({ title }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;
    setLoading(true);
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=b29472dd&type=movie`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [title]);

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
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState("");

  return (
    <>
      <Search setTitle={setTitle} />
      <Results title={title} />
    </>
  );
}

export default App;

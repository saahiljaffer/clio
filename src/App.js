import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/lib/Container";
import {
  Container,
  Col,
  Row,
  ListGroup,
  // Form,
  // FormControl,
} from "react-bootstrap";
// import Row from "react-bootstrap/Row";

function Search({ setTitle }) {
  const onChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <h5>Movie title</h5>
      <input
        onChange={onChange}
        type="text"
        id="textInput"
        placeholder="Search"
        className="w-100 p-3"
        style={{ width: "100%" }}
        // className="mr-sm-2"
      />
    </div>
  );
}

function Results({ title, page, setNominated, nominated, setPage }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    return <h5>Please search with at least 3 characters</h5>;

  if (loading) return <h5>Loading...</h5>;

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (!data) return null;

  if (data.Response === "False") return <h5>No results for "{title}"</h5>;

  return (
    <>
      <h5>Results for "{title}"</h5>
      <ListGroup className="list-unstyled">
        {data.Search.map((data) => (
          <ListGroup.Item key={data.imdbID}>
            {/* <Container> */}
            <Row className="align-items-center">
              <Col md="auto">
                <Button
                  onClick={() =>
                    setNominated({ list: [...nominated.list, data] })
                  }
                  variant="outline-secondary"
                  size="sm"
                  name="imdbID"
                  value={data.imdbID}
                >
                  Nominate
                </Button>
              </Col>
              <Col>
                {data.Title} ({data.Year})
              </Col>
            </Row>
            {/* </Container> */}
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Button
                style={{ textAlign: "center" }}
                size="sm"
                variant="outline-secondary"
                onClick={() => setPage(page + 1)}
              >
                Next Page
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

function Nominated({ nominated, setNominated }) {
  return (
    <>
      <h5>Nominations</h5>
      <ListGroup className="list-unstyled">
        {nominated.list.map((movie) => (
          <ListGroup.Item key={movie.imdbID}>
            <Row className="align-items-center">
              <Col md="auto">
                <Button
                  onClick={() =>
                    setNominated({
                      list: nominated.list.filter((e) => e !== movie),
                    })
                  }
                  variant="outline-secondary"
                  size="sm"
                  name="imdbID"
                  value={movie.imdbID}
                >
                  Remove
                </Button>
              </Col>
              <Col>
                {movie.Title} ({movie.Year})
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [nominated, setNominated] = useState({ list: [] });

  return (
    <>
      <Container className="bg-light">
        <Row className="py-5">
          <Col>
            <h2>The Shoppies</h2>
            <Search setTitle={setTitle} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Results
              title={title}
              page={page}
              setPage={setPage}
              setNominated={setNominated}
              nominated={nominated}
            />
          </Col>
          {/* <div className="d-lg-none w-100"></div> */}
          <Col>
            <Nominated nominated={nominated} setNominated={setNominated} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

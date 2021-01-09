import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import {
  Container,
  Col,
  Row,
  ListGroup,
  Card,
  Pagination,
} from "react-bootstrap";

function Search({ setTitle, setPage }) {
  const onChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <h5>Movie Title</h5>
        </Card.Header>
        <Card.Body>
          <input
            onChange={onChange}
            type="text"
            id="textInput"
            placeholder="Please search with 3+ characters"
            className="w-100 p-3"
            style={{ width: "100%" }}
          />
        </Card.Body>
      </Card>
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
    return (
      <Card.Header>
        <h5>Results</h5>
      </Card.Header>
    );

  if (loading)
    return (
      <Card.Header>
        <h5>Loading...</h5>
      </Card.Header>
    );

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (!data) return null;

  if (data.Response === "False")
    return (
      <Card.Header>
        <h5>No results for "{title}"</h5>
      </Card.Header>
    );

  let items = [];

  items.push(
    <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
  );
  items.push(
    <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
  );

  var firstPage = Math.max(page - 2, 1);
  var maxPage = Math.ceil(data.totalResults / 10);
  var lastPage = Math.min(maxPage, firstPage + 4);

  if (lastPage - page === 1) {
    firstPage -= 1;
  } else if (lastPage - page === 0) {
    firstPage -= 2;
  }

  for (let number = firstPage; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        className="text-secondary"
        onClick={() => setPage(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  items.push(
    <Pagination.Next
      disabled={page === maxPage}
      onClick={() => setPage(page + 1)}
    />
  );
  items.push(
    <Pagination.Last
      disabled={page === maxPage}
      onClick={() => setPage(maxPage)}
    />
  );

  return (
    <div>
      <Card.Header>
        <Card.Title>Results for "{title}"</Card.Title>
      </Card.Header>
      <Card.Body style={{ padding: "0" }}>
        <ListGroup variant="flush">
          {data.Search.map((data) => (
            <ListGroup.Item action variant="light" key={data.imdbID}>
              <Row className="align-items-center">
                <Col sm="auto" style={{ width: "auto" }}>
                  <Button
                    onClick={() => {
                      if (nominated.list.length < 5) {
                        setNominated({ list: [...nominated.list, data] });
                      }
                    }}
                    disabled={
                      nominated.list.includes(data) ||
                      nominated.list.length >= 5
                    }
                    variant="secondary"
                    size="sm"
                    name="nominate"
                    value={data}
                  >
                    Nominate
                  </Button>
                </Col>
                <Col>
                  {data.Title} ({data.Year})
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>

      <Card.Footer>
        <Row className="justify-content-center">
          <Pagination>{items}</Pagination>
          {/* <Col style={{ textAlign: "center" }}>
            <Button
              style={{ textAlign: "center" }}
              size="sm"
              variant="secondary"
              disabled={page >= data.totalResults / 10}
              onClick={() => setPage(page + 1)}
            >
              Next Page
            </Button>
          </Col> */}
        </Row>
      </Card.Footer>
    </div>
  );
}

function Nominated({ nominated, setNominated }) {
  return (
    <>
      <Card>
        <Card.Header>
          <h5>Nominations</h5>
        </Card.Header>
        <Card.Body style={{ minHeight: "0", padding: "0" }}>
          <ListGroup variant="flush">
            {nominated.list.map((movie) => (
              <ListGroup.Item action variant="light" key={movie.imdbID}>
                <Row className="align-items-center">
                  <Col md="auto">
                    <Button
                      onClick={() =>
                        setNominated({
                          list: nominated.list.filter((e) => e !== movie),
                        })
                      }
                      variant="secondary"
                      size="sm"
                      name="remove"
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
        </Card.Body>
      </Card>
    </>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [nominated, setNominated] = useState({ list: [] });

  document.body.style = "background: #E9E9EC;";

  return (
    <>
      <Container>
        <Row>
          <Col className="py-3">
            <h2>The Shoppies</h2>
            <Search setTitle={setTitle} setPage={setPage} />
          </Col>
        </Row>
        <Row>
          {/* <CardGroup className="w-100"> */}
          <Col className="py-3">
            <Card className="w-100">
              {/* TODO: think about using cards */}
              <Results
                title={title}
                page={page}
                setPage={setPage}
                setNominated={setNominated}
                nominated={nominated}
              />
            </Card>
          </Col>
          <div className="d-md-none w-100"></div>
          <Col className="py-3">
            <Nominated nominated={nominated} setNominated={setNominated} />
          </Col>
          {/* </CardGroup> */}
        </Row>
      </Container>
    </>
  );
}

export default App;

import {
  Pagination,
  ListGroup,
  Col,
  Image,
  Row,
  Button,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";

//Pagination for results page
function ResultsPagination({ page, setPage, data }) {
  //Initialize array
  let items = [];
  //First and previous buttons
  items.push(
    <Pagination.First
      key="first"
      disabled={page === 1}
      onClick={() => setPage(1)}
    />
  );
  items.push(
    <Pagination.Prev
      key="previous"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    />
  );
  //Calculate page numbers
  var firstPage = Math.max(page - 2, 1);
  var maxPage = Math.ceil(data.totalResults / 10);
  var lastPage = Math.min(maxPage, firstPage + 4);
  if (firstPage >= 2 && lastPage - page === 1) {
    firstPage -= 1;
  } else if (firstPage >= 3 && lastPage - page === 0) {
    firstPage -= 2;
  }
  //Dynamically create numbered page buttons
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
  //Next and last buttons
  items.push(
    <Pagination.Next
      key="next"
      disabled={page === maxPage}
      onClick={() => setPage(page + 1)}
    />
  );
  items.push(
    <Pagination.Last
      key="last"
      disabled={page === maxPage}
      onClick={() => setPage(maxPage)}
    />
  );
  return <Pagination>{items}</Pagination>;
}

//List of search results
function ResultsList({ data, nominated, setNominated }) {
  return (
    <ListGroup variant="flush">
      {data.Search.map((data) => (
        <ListGroup.Item key={data.imdbID}>
          <Row className="align-items-center">
            {/* Nominate Buttons */}
            <Col sm="auto" style={{ width: "auto" }}>
              <Button
                // Add to list if list has space
                onClick={() => {
                  if (nominated.list.length < 5) {
                    setNominated({ list: [...nominated.list, data] });
                  }
                }}
                // Disabled if on list or if list is full
                disabled={
                  nominated.list.find(
                    (element) => element.imdbID === data.imdbID
                  ) || nominated.list.length >= 5
                }
                variant="secondary"
                size="sm"
                name="nominate"
                value={data}
              >
                Nominate
              </Button>
            </Col>
            {/* Movie Poster */}
            <Col sm="auto" style={{ width: "auto" }}>
              <Image
                src={data.Poster}
                alt=""
                style={{ height: "40px", width: "27px" }}
                rounded
              />
            </Col>
            {/* Movie Information */}
            <Col>
              {data.Title} ({data.Year})
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export function Results({ title, page, setNominated, nominated, setPage }) {
  //Initialize Variables
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //API call
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
  //Only search once search query is at least 3 characters
  if (title.length < 3)
    return (
      <Card.Header>
        <h5>Results</h5>
      </Card.Header>
    );
  //Loading message
  if (loading)
    return (
      <Card.Header>
        <h5>Loading...</h5>
      </Card.Header>
    );
  //Error Message
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return (
      <Card.Header>
        <h5>Error! Please contact saahil.jaffer@uwaterloo.ca</h5>
      </Card.Header>
    );
  }
  //Fallback for lack of data
  if (!data) return null;
  //Fallback for no results
  if (data.Response === "False")
    return (
      <Card.Header>
        <h5>No results for "{title}"</h5>
      </Card.Header>
    );
  return (
    <div>
      <Card.Header>
        <Card.Title>Results for "{title}"</Card.Title>
      </Card.Header>
      <Card.Body style={{ padding: "0" }}>
        <ResultsList
          data={data}
          nominated={nominated}
          setNominated={setNominated}
        />
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-center">
          <ResultsPagination page={page} setPage={setPage} data={data} />
        </Row>
      </Card.Footer>
    </div>
  );
}

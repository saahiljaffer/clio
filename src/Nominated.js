import { ListGroup, Card, Row, Col, Button, Image } from "react-bootstrap";

function NominatedList({ nominated, setNominated }) {
  return (
    <ListGroup variant="flush">
      {nominated.list.map((movie) => (
        <ListGroup.Item key={movie.imdbID}>
          <Row className="align-items-center">
            {/* Button */}
            <Col sm="auto" style={{ width: "auto" }}>
              <Button
                onClick={() =>
                  setNominated({
                    list: nominated.list.filter(
                      (element) => element.imdbID !== movie.imdbID
                    ),
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
            {/* Movie Poster */}
            <Col sm="auto" style={{ width: "auto" }}>
              <Image
                src={movie.Poster}
                alt=""
                style={{ height: "40px", width: "27px" }}
                rounded
              />
            </Col>
            {/* Movie Information */}
            <Col>
              {movie.Title} ({movie.Year})
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export function Nominated({ nominated, setNominated }) {
  return (
    <>
      <Card>
        <Card.Header>
          <h5>Nominations</h5>
        </Card.Header>
        <Card.Body style={{ minHeight: "0", padding: "0" }}>
          <NominatedList nominated={nominated} setNominated={setNominated} />
        </Card.Body>
      </Card>
    </>
  );
}

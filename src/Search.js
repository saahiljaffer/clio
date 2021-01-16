import { Card } from "react-bootstrap";

export function Search({ setTitle, setPage }) {
  // Set page to 1 for new search queries
  const onChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <Card>
        {/* Title */}
        <Card.Header>
          <h5>Movie Title</h5>
        </Card.Header>
        {/* Search Bar */}
        <Card.Body>
          <input
            onChange={onChange}
            type="text"
            id="textInput"
            placeholder="Please search with 3+ characters..."
            className="w-100 p-3"
            style={{ width: "100%" }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

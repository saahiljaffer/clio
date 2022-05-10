import "./App.css";
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Search } from "./Search.js";
import { Results } from "./Results.js";
import { Nominated } from "./Nominated.js";

function App() {
  //Initialize Variables
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  //Retrieve nominated list from local storage
  const saved = JSON.parse(localStorage.getItem("nominated"));
  const [nominated, setNominated] = useState(saved || { list: [] });
  //Update local storage when nominated list changes
  useEffect(() => {
    localStorage.setItem("nominated", JSON.stringify(nominated));
  }, [nominated]);
  //Change background colour
  document.body.style = "background: #E9E9EC;";
  //Base app
  return (
    <>
      <Container>
        {/* Search */}
        <Row>
          <Col className="py-3">
            <h2>The Clio Awards</h2>
            <Search setTitle={setTitle} setPage={setPage} />
          </Col>
        </Row>
        <Row>
          {/* Results */}
          <Col className="py-3">
            <Card className="w-100">
              <Results
                title={title}
                page={page}
                setPage={setPage}
                setNominated={setNominated}
                nominated={nominated}
              />
            </Card>
          </Col>
          {/* For responsiveness */}
          <div className="d-md-none w-100"></div>
          {/* Nominated List */}
          <Col className="py-3">
            <Nominated nominated={nominated} setNominated={setNominated} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

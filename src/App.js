import React from "react";
import Header from "./components/Header";
import LiveVisitors from "./components/LiveVisitors";
import { Container, Row } from "reactstrap";
function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <LiveVisitors />
        </Row>
      </Container>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Container/Layout";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;

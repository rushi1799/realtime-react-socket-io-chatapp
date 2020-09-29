import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import Layout from "./components/Container/Layout";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketProvider>
          <Layout />
        </SocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

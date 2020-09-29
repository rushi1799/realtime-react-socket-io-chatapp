import React, { createContext } from "react";
import openSocket from "socket.io-client";

export const SocketContext = createContext();

const socket = openSocket("http://localhost:3000/");

export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

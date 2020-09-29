import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { SocketContext } from "../../context/SocketContext";

const ChatBox = ({ room }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  let user;

  useEffect(() => {
    user = prompt("Enter your name..");
    socket.emit("join_room", { user, room });
    socket.on("online", (users) => {
      setUsers(users);
    });
  }, [user]);
  return (
    <Fragment>
      <Row className="mt-3">
        <Col xs="12">
          <h2 className="diplay-4"> Welcome to {room.toUpperCase()} room</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="8"></Col>
        <Col xs="4">
          <ul>
            {users.map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ChatBox;

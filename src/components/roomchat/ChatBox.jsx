import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row, Button } from "reactstrap";
import { SocketContext } from "../../context/SocketContext";
import Chat from "./Chat";

const ChatBox = ({ room, open, show }) => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [curuser, setUser] = useState("");
  let user;

  useEffect(() => {
    user = prompt("Enter your name..");
    setUser(user);
    socket.emit("join_room", { user, room });
    socket.on("online", (users) => {
      setUsers(users);
    });
  }, [user]);

  const handleLeave = () => {
    socket.emit("leave_room", { room, curuser });
    open();
  };

  return (
    <Fragment>
      <Row className="mt-3">
        <Col xs="12">
          <h2 className="diplay-4"> Welcome to {room.toUpperCase()} room</h2>
        </Col>
      </Row>
      <Row className="mt-3 ">
        <Col md="9 d-flex justify-content-center">
          <Chat room={room} user={curuser} />
        </Col>
        <Col md="3">
          <div className="border border-primary rounded">
            <strong className="px-3 mt-2 ">Online User</strong>
            <ul className="border-top border-primary mt-2 pt-2">
              {users.map((usr) => (
                <li
                  style={{ textTransform: "capitalize", color: "lightgreen" }}>
                  {usr}
                </li>
              ))}
            </ul>
            {show && (
              <div className="m-2 d-flex justify-content-end">
                <Button color="danger" onClick={handleLeave}>
                  Leave Room
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ChatBox;

import React, { Fragment, useState } from "react";
import openSocket from "socket.io-client";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
} from "reactstrap";
const socket = openSocket("http://localhost:3000/");

const RoomChat = () => {
  const [rooms, setRooms] = useState(["java"]);
  const [formdata, setFormData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setRooms([...rooms, formdata]);
    setFormData("");
  };
  const joinRoom = (idx) => {
    let room = rooms[idx].toLowerCase();
  };

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <h1>Room Chat</h1>
        </Col>
      </Row>
      <Row>
        {rooms.length > 0 && (
          <Col md="6">
            <ListGroup>
              {rooms.map((room, idx) => (
                <ListGroupItem key={idx}>
                  <strong style={{ textTransform: "capitalize" }}>
                    {room}
                  </strong>
                  <Button
                    color="primary"
                    className="float-right"
                    onClick={() => {
                      joinRoom(idx);
                    }}>
                    Join Room
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        )}
        <Col lg="6" className="mt-sm-2 mt-lg-0">
          <Form inline onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="room" hidden>
                Room
              </Label>
              <Input
                type="text"
                name="room"
                id="room"
                placeholder="Room Name"
                value={formdata}
                onChange={(e) => setFormData(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" className="mx-3">
              Create room
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default RoomChat;

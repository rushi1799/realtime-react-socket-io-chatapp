import React, { useState, Fragment, useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
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

const RoomList = ({ setRoom, open }) => {
  const [rooms, setRooms] = useState([]);
  const [formdata, setFormData] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("rooms");
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("add_room", formdata);
    setFormData("");
  };
  const joinRoom = (idx) => {
    let room = rooms[idx].toLowerCase();
    setRoom(room);
    open();
  };
  return (
    <Fragment>
      <Row className="mt-3">
        <Col xs="12">
          <h2 className="diplay-4"> Room Chat</h2>
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
            <Button color="primary" className="mx-2">
              Create room
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default RoomList;

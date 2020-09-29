import React, { useState, Fragment, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "reactstrap";
import "./Chat.css";
const Chat = ({}) => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  return (
    <Fragment>
      <div className="chat rounded border">
        <div className="upper p-3">
          <div className="w-75 m-2  received rounded">
            <h6>friend</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              fugiat facilis iure placeat molestias delectus dolor voluptas
              consequuntur voluptatibus dicta?
            </p>
          </div>
          <p className="server">hi</p>
          <div className="w-75 m-2 sent rounded">
            <h6>You</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="lower">
          <textarea
            name="message"
            id=""
            value={message}
            cols="30"
            rows="10"
            onChange={(e) => setMessage(e.target.value)}></textarea>
          <Button color="primary" className="send">
            send
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;

import React, { useState, Fragment, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "reactstrap";
import "./Chat.css";
const Chat = ({ room, user }) => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState("");
  let timeout;
  useEffect(() => {
    socket.on("server_message", (data) => {
      setChat((chat) => [...chat, data]);
    });
    socket.on("message", (data) => {
      setChat((chat) => [...chat, data]);
    });
    socket.on("typing", (mess) => {
      setTyping(mess);
    });
    socket.on("stop_typing", () => {
      setTyping("");
    });
  }, [socket]);

  const handleSend = () => {
    socket.emit("message", { message, room, user });
    setMessage("");
    clearTimeout(timeout);
  };
  const handledown = () => {
    socket.emit("typing", { room, user });
    timeout = setTimeout(() => {
      socket.emit("stop_typing", { room });
    }, 2000);
  };

  return (
    <Fragment>
      <div className="chat rounded border">
        <h6> Chat {typing}</h6>
        <div className="upper p-3">
          {chat.map((mess, idx) => {
            if (mess.name !== "server") {
              return (
                <div
                  key={idx}
                  className={`w-75 m-2  ${
                    mess.name === user ? "sent" : "received"
                  } rounded`}>
                  <h6>{mess.name}</h6>
                  <p>{mess.message}</p>
                </div>
              );
            } else {
              return (
                <p key={idx} className="server">
                  {mess.message}
                </p>
              );
            }
          })}
        </div>
        <div className="lower">
          <textarea
            name="message"
            id=""
            value={message}
            cols="30"
            rows="10"
            onKeyDown={handledown}
            onChange={(e) => setMessage(e.target.value)}></textarea>
          <Button color="primary" className="send" onClick={handleSend}>
            send
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;

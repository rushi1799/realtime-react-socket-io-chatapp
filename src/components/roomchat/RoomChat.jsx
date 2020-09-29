import React, { Fragment, useState } from "react";
import RoomList from "./RoomList";
import ChatBox from "./ChatBox";

const RoomChat = () => {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState("");
  return (
    <Fragment>
      {open ? (
        <ChatBox room={room} open={() => setOpen(!open)} show={true} />
      ) : (
        <RoomList setRoom={setRoom} open={() => setOpen(!open)} />
      )}
    </Fragment>
  );
};

export default RoomChat;

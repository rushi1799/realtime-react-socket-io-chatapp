import React, { Fragment, useState } from "react";
import RoomList from "./RoomList";
import ChatBox from "./ChatBox";

const RoomChat = () => {
  const [open, setOpen] = useState(true);
  const [room, setRoom] = useState("java");
  return (
    <Fragment>
      {open ? (
        <ChatBox room={room} open={() => setOpen(!open)} />
      ) : (
        <RoomList setRoom={setRoom} open={() => setOpen(!open)} />
      )}
    </Fragment>
  );
};

export default RoomChat;

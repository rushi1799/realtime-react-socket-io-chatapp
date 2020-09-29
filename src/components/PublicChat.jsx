import React from "react";
import ChatBox from "./roomchat/ChatBox";
const PublicChat = () => {
  return <ChatBox show={false} room="public" />;
};

export default PublicChat;

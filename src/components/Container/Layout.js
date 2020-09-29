import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header";
import LiveVisitors from "../LiveVisitors";
import PublicChat from "../PublicChat";
import RoomChat from "../roomchat/RoomChat";
import { Container } from "reactstrap";
const Layout = () => {
  return (
    <Fragment>
      <Header />

      <Container>
        <Switch>
          <Route exact path="/" component={PublicChat} />
          <Route exact path="/livevisitors" component={LiveVisitors} />
          <Route exact path="/roomchat" component={RoomChat} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Layout;

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          Chat App
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                to="/roomchat"
                className="mx-md-5"
                style={{ color: "inherit" }}>
                RoomChat
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/livevisitors" style={{ color: "inherit" }}>
                Online
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
   } from 'reactstrap';

const Header = () => {
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">Online Banking</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink href="/">LogOut</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Header;

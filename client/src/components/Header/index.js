import React from 'react';
import {
  Navbar,
  NavbarBrand
   } from 'reactstrap';

const Header = () => {
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">Online Banking</NavbarBrand>
      </Navbar>
    </div>
  )
}

export default Header;

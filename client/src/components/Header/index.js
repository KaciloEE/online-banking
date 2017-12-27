import React from 'react';
import {
  Navbar,
  NavbarBrand
   } from 'reactstrap';

const App = () => {
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">Online Banking</NavbarBrand>
      </Navbar>
    </div>
  )
}

export default App;

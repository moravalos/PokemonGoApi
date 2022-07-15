import React from "react";
import {NavLink} from "react-router-dom";
const { useContext } = React;

const Navbar = () => {
  
  return (
    <nav className ="navbar">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to='/inicio' >Perfil</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/pokemon'>Features</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/items'>Pricing</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;

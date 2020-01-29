import React, { Component } from "react";
import logo from "../assets/logo/Logo-instock.png";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <NavLink className="header__link-logo" to="/locations">
          <img className="header-logo" src={logo} alt="logo"></img>
        </NavLink>
        <NavLink
          className="header__link-inventory"
          activeClassName="header__link-inventory-active"
          to="/inventory"
        >
          Inventory
        </NavLink>
        <NavLink
          className="header__link-locations"
          activeClassName="header__link-locations-active"
          to="/locations"
        >
          Locations
        </NavLink>
      </div>
    );
  }
}

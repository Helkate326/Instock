import React, { Component } from "react";
import LocationDetail from "./subcomponents/locationDetail";
import Search from "../assets/icons/SVG/Icon-search.svg";
import Add from "../assets/icons/SVG/Icon-add.svg";
import LocationCreateNew from "./subcomponents/locationCreateNew";

export default class Locations extends Component {
  tRef = React.createRef();
  state = { location: "warehouse" };
  render() {
    return (
      <div className="location">
        <div className="location__header">
          <div className="location__title">Locations</div>
          <div className="location__search">
            <img
              className="location__search--icon"
              alt="location search icon"
              src={Search}
            ></img>
            <input
              className="location__search--input"
              name="search"
              placeholder="Search"
            ></input>
          </div>
        </div>

        <div className="location__content">
          <LocationDetail flag={this.tRef} />
        </div>

        <button
          className="location__add"
          onClick={() => {
            document.getElementsByClassName(
              "location__createNew"
            )[0].style.display = "flex";
          }}
        >
          <img
            className="location__add-icon"
            alt="add button icon"
            src={Add}
          ></img>
        </button>

        <LocationCreateNew flag={this.tRef} />
      </div>
    );
  }
}

import React, { Component } from "react";
import LeftArrow from "../../assets/icons/SVG/Icon-back-arrow.svg";
import ProductDetail from "../subcomponents/warehouseInfo_productDetail";
import { Link } from "react-router-dom";
import axios from "axios";

export default class warehouseInfo extends Component {
  state = { warehouse: undefined };

  componentDidMount() {
    axios.get("http://localhost:8080/locations/content").then(response => {
      let warehouseInfo = response.data;
      var found = false;

      let foundElement = warehouseInfo.map(element => {
        console.log(element.warehouse);
        if (element.warehouse === this.props.match.params.warehouse && !found) {
          found = true;
          return element;
        }
      });
      console.log(foundElement);
      let result = undefined;
      foundElement.map(element => {
        if (element !== undefined) {
          result = element;
        }
      });

      this.setState({ warehouse: result });
    });
  }

  render() {
    if (this.state.warehouse === undefined) {
      return <div>Loading ... </div>;
    } else {
      return (
        <div className="warehouse">
          <div className="warehouse__title">
            <Link to="/locations" className="warehouse__title-link">
              <img
                className="warehouse__title-icon"
                alt="left arrow icon"
                src={LeftArrow}
              />
            </Link>
            <div className="warehouse__title-info">
              {this.state.warehouse.warehouse}
            </div>
          </div>
          <hr className="warehouse__seperater" />
          <div className="warehouse__tabdesk-wrapper">
            <div className="warehouse__address">
              <div className="warehouse__address-label">ADDRESS</div>
              <div className="warehouse__address-street">
                <div className="warehouse__address-street--location">
                  {this.state.warehouse.address}
                </div>
                <div className="warehouse__address-street--number">
                  Suite 201
                </div>
              </div>
              <div className="warehouse__address-location">
                <div className="warehouse__address-location--state">
                  {this.state.warehouse.city}
                </div>
                <div className="warehouse__address-location--country">
                  M65GB7 CA
                </div>
              </div>
            </div>
            <div className="warehouse__contact">
              <div className="warehouse__contact-label">CONTACT</div>
              <div className="warehouse__contact-manager">
                <div className="warehouse__contact-manager--name">
                  {this.state.warehouse.contact}
                </div>
                <div className="warehouse__contact-manager--role">
                  {this.state.warehouse.role}
                </div>
              </div>
              <div className="warehouse__contact-info">
                <div className="warehouse__contact-info--number">
                  {this.state.warehouse.phone}
                </div>
                <div className="warehouse__contact-info--email">
                  {this.state.warehouse.email}
                </div>
              </div>
            </div>
          </div>

          <ProductDetail
            name={this.state.warehouse.warehouse}
            mobile={this.state.mobile}
            tabdesk={this.state.tabdesk}
          />
        </div>
      );
    }
  }
}

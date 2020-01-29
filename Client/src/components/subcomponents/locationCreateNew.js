import React, { Component } from "react";
import axios from "axios";

export default class locationCreateNew extends Component {
  submitHandler = event => {
    event.preventDefault();
    let warehouse = event.target.warehouse.value;
    let address = event.target.address.value;
    let location = event.target.location.value;
    let contact = event.target.contact.value;
    let position = event.target.position.value;
    let phone = event.target.phone.value;
    let email = event.target.email.value;
    let description = event.target.description.value.split(",");
    let newWarehouse = {
      warehouse: warehouse,
      address: address,
      city: location,
      country: "Canada",
      contact: contact,
      role: position,
      phone: phone,
      email: email,
      categories: description
    };

    console.log(this.props.flag.current);

    axios
      .post("http://localhost:8080/locations/content", newWarehouse)
      .then(response => {
        console.log(response.data);
        console.log(alert("Information added successfully"));
        document.getElementsByClassName(
          "location__createNew"
        )[0].style.display = "none";
      });
    console.log(newWarehouse);
    event.target.reset();
  };

  clickHandler = event => {
    document.getElementsByClassName("location__createNew")[0].style.display =
      "none";
  };
  render() {
    return (
      <div className="location__createNew">
        <form
          ref={this.props.flag}
          className="location__createNew-form"
          onSubmit={this.submitHandler}
        >
          <div className="location__createNew-form--title">Add New</div>
          <div className="tabdesk__wrapper">
            <div className="location__createNew-form--item">
              <div className="location__createNew-form--item--label">
                WAREHOUSE
              </div>
              <input
                className="location__createNew-form--item--input"
                name="warehouse"
                placeholder="Name & ID"
              ></input>
            </div>
            <div className="formatter">
              <div className="location__createNew-form--item">
                <div className="location__createNew-form--item--label">
                  ADDRESS
                </div>
                <input
                  className="location__createNew-form--item--input"
                  name="address"
                  placeholder="Enter Address"
                ></input>
              </div>

              <div className="location__createNew-form--item">
                <div className="location__createNew-form--item--label">
                  LOCATION
                </div>
                <input
                  className="location__createNew-form--item--input"
                  name="location"
                  placeholder="Toronto, CAN"
                ></input>
              </div>

              <div className="location__createNew-form--item">
                <div className="location__createNew-form--item--label">
                  CONTACT NAME
                </div>
                <input
                  className="location__createNew-form--item--input"
                  name="contact"
                  placeholder="Enter Name"
                ></input>
              </div>

              <div className="location__createNew-form--item">
                <div className="location__createNew-form--item--label">
                  POSITION
                </div>
                <input
                  className="location__createNew-form--item--input"
                  name="position"
                  placeholder="Enter Position"
                ></input>
              </div>

              <div className="location__createNew-form--item">
                <div className="location__createNew-form--item--label">
                  PHONE NUMBER
                </div>
                <input
                  className="location__createNew-form--item--input"
                  name="phone"
                  placeholder="(000) 000 - 0000"
                ></input>
              </div>

              <div className="location__createNew-form--item">
                <div className="location__createNew-form--item--label">
                  EMAIL
                </div>
                <input
                  className="location__createNew-form--item--input"
                  name="email"
                  placeholder="email@instock.com"
                ></input>
              </div>
            </div>

            <div className="location__createNew-form--item tabdesk__description">
              <div className="location__createNew-form--item--label">
                ITEM DESCRIPTION
              </div>
              <input
                className="location__createNew-form--item--input description__input"
                name="description"
                placeholder="Use commas to separate each category"
              ></input>
            </div>
          </div>
          <div className="tabdesk__button">
            <input
              type="submit"
              className="location__createNew-form--submit"
              value="SAVE"
            />

            <button
              type="button"
              className="location__createNew-form--cancel"
              onClick={this.clickHandler}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }
}

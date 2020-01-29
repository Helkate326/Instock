import React, { Component } from "react";
import axios from "axios";
import Switch from "react-switch";

export default class Create extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    console.log(checked);
    console.log(this.state.checked);
  }

  uploadSubmit = submit => {
    axios.post("http://localhost:8080/inventory", {
      product: submit.target.product.value,
      date: submit.target.date.value,
      city: submit.target.city.value,
      country: submit.target.country.value,
      quantity: submit.target.quantity.value,
      status: this.state.checked === false ? "Out Of Stock" : "In Stock",
      description: submit.target.description.value
    });
    submit.target.reset();
  };
  render() {
    return (
      <div className="create-background">
        <form className="create" onSubmit={this.props.addFunction}>
          <h1 className="create-title">Create New</h1>
          <div className="create-flex">
            {/* Last Product name input */}
            <div className="create__container">
              <h4 className="create__container-title silver">PRODUCT</h4>
              <input
                required
                name="name"
                className="create__container-input"
                placeholder="Item Name"
              ></input>
            </div>

            {/* Last Ordered input */}
            <div className="create__container">
              <h4 className="create__container-title silver">LAST ORDERED</h4>
              <input
                required
                name="date"
                className="create__container-input"
                placeholder="yyyy-mm-dd"
              ></input>
            </div>
          </div>

          <div className="create-flex">
            {/* Warehouse input */}
            <div className="create__container">
              <h4 className="create__container-title silver">WAREHOUSE</h4>
              <select
                name="warehouse"
                required
                className="create__container-input"
              >
                <option value="0"></option>
                <option value="0">Warehouse 1</option>
              </select>
            </div>
            {/* City input */}
            <div className="create__container">
              <h4 className="create__container-title silver">CITY</h4>
              <input
                required
                name="city"
                className="create__container-input"
                placeholder="City"
              ></input>
            </div>
          </div>

          <div className="create-flex">
            {/* Country input */}
            <div className="create__container">
              <h4 className="create__container-title silver">COUNTRY</h4>
              <input
                required
                name="country"
                className="create__container-input"
                placeholder="Canada"
              ></input>
            </div>

            {/* Quantity input */}
            <div className="create__container">
              <h4 className="create__container-title silver">QUANTITY</h4>
              <input
                required
                name="quantity"
                className="create__container-input"
                placeholder="0"
              ></input>
            </div>
          </div>
          <div className="create__container__switch">
            <h4 className="create__container-title silver">STATUS</h4>
            <div className="create__container-flex" id="instock-flex">
              <label id="label-black">In Stock</label>
              <label className="create__container-switch">
                <Switch
                  name="status"
                  checked={this.state.checked}
                  onChange={this.handleChange}
                  onColor="#86d3ff"
                  onHandleColor="#ffffff"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                />
              </label>
            </div>
          </div>

          <div className="create__container">
            <h4 className="create__container-title silver">ITEM DESCRIPTION</h4>
            <input
              name="description"
              className="create__container-input create__container-input-optional"
              id="optional"
              placeholder="(Optional)"
            ></input>
          </div>
          <div className="create__button">
            <button className="create__button-save">SAVE</button>
            <button type="button" className="create__button-cancel">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }
}

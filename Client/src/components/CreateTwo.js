import React, { Component } from "react";
import axios from "axios";
import Switch from "react-switch";

export default class Create extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
    /* Here!!! */
    this.city = React.createRef();
    this.country = React.createRef();
    /* Here!!! */
  }

  /* Here!!! */
  getWarehouse = select => {
    const selectedWarehouse = select.target.value;
    axios.get("http://localhost:8080/locations/content").then(response => {
      const locations = response.data;
      const warehouseInfo = locations.find(
        location => location.warehouse === selectedWarehouse
      );
      this.city.current.value = warehouseInfo.city;
      this.country.current.value = warehouseInfo.country;
    });
  };
  /* Here!!! */

  handleChange(checked) {
    this.setState({ checked });
    console.log(checked);
  }

  // Instock(submit) {
  //   if (submit === { checked: false }) {
  //     console.log(submit)
  //     return "Instock";
  //   } else {
  //     return "Not in Stock";
  //   }
  // }

  uploadSubmit = submit => {
    axios.post("http://localhost:8080/inventory", {
      product: submit.target.product.value,
      date: submit.target.date.value,
      city: submit.target.city.value,
      country: submit.target.country.value,
      quantity: submit.target.quantity.value,
      status: this.Instock(this.state),
      description: submit.target.description.value
    });
    submit.target.reset();
  };
  render() {
    return (
      <form onSubmit={this.props.addFunction} className="create">
        <h1 className="create-title">Create New</h1>

        {/* Last Product name input */}
        <div className="create__container">
          <h4 className="create__container-title silver">PRODUCT</h4>
          <input
            required
            name="product"
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

        {/* Warehouse input */}
        <div className="create__container">
          <h4 className="create__container-title silver">WAREHOUSE</h4>

          <select
            required
            name="warehouse"
            className="create__container-input"
            /* Here!!! */
            onChange={this.getWarehouse}
            /* Here!!! */
          >
            <option value="0"></option>
            {/* Here!!! */}
            <option value="Warehouse Number 1">Warehouse 1</option>
            <option value="Warehouse Number 2">Warehouse 2</option>
            {/* Here!!! */}
          </select>
        </div>

        {/* City input */}
        <div className="create__container">
          <h4 className="create__container-title silver">CITY</h4>
          <input
            required
            name="city"
            ref={this.city}
            className="create__container-input"
            placeholder="City"
          ></input>
        </div>

        {/* Country input */}
        <div className="create__container">
          <h4 className="create__container-title silver">COUNTRY</h4>
          <input
            required
            name="country"
            ref={this.country}
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

        <div className="create__container">
          <h4 className="create__container-title silver">STATUS</h4>
          <div className="create__container-flex">
            <label id="label-black">In Stock</label>
            <label className="create__container-switch">
              <Switch
                name="status"
                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
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
            className="create__container-input"
            id="optional"
            placeholder="(Optional)"
          ></input>
        </div>
        <div className="create__container">
          <button className="create__container-save">SAVE</button>
          <button
            onClick={this.props.uploadCancel}
            type="button"
            className="create__container-cancel"
          >
            CANCEL
          </button>
        </div>
      </form>
    );
  }
}

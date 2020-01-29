import React, { Component } from "react";
import axios from "axios";
import Switch from "react-switch";
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      warehouses: undefined,
      warehouseNames: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.city = React.createRef();
    this.country = React.createRef();
  }
  render() {
    return !this.state.warehouses ? (
      <>Loading...</>
    ) : (
      <div className="create-background">
        <form onSubmit={this.props.addFunction} className="create">
          <h1 className="create-title">Create New</h1>
          <div className="create-flex">
            <div className="create__container">
              <h4 className="create__container-title silver">PRODUCT</h4>
              <input
                required
                name="name"
                className="create__container-input"
                placeholder="Item Name"
              ></input>
            </div>
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
            <div className="create__container">
              <h4 className="create__container-title silver">WAREHOUSE</h4>
              <select
                name="warehouse"
                required
                className="create__container-input"
                onChange={this.populateWarehouse}
              >
                <option value=""></option>
                {this.state.warehouseNames}
              </select>
            </div>
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
          </div>
          <div className="create-flex">
            <div className="create__container">
              <h4 className="create__container-title silver">COUNTRY</h4>
              <input
                required
                ref={this.country}
                name="country"
                className="create__container-input"
                placeholder="Country"
              ></input>
            </div>
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
          <div className="create-flex">
            <div className="create__container">
              <h4 className="create__container-title silver">Ordered By</h4>
              <input
                required
                name="customer"
                className="create__container-input"
              ></input>
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
                    onColor="#82B72A"
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
                    value={this.state.checked ? "In Stock" : "Out of Stock"}
                  />
                </label>
              </div>
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
            <button
              onClick={this.props.uploadCancel}
              type="button"
              className="create__button-cancel"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.getWarehouses();
  }

  populateWarehouse = select => {
    const selectedWarehouse = select.target.value;

    const warehouseInfo = this.state.warehouses.find(
      location => location.warehouse === selectedWarehouse
    );
    if (warehouseInfo) {
      this.city.current.value = warehouseInfo.city;
      this.country.current.value = warehouseInfo.country;
    } else {
      this.city.current.value = "";
      this.country.current.value = "";
    }
  };
  getWarehouses = () => {
    axios.get("http://localhost:8080/locations/content").then(response => {
      this.setState({ warehouses: response.data }, () => {
        const options = this.state.warehouses.map(warehouse => {
          return (
            <option value={warehouse.warehouse}>{warehouse.warehouse}</option>
          );
        });
        console.log("options", options);
        this.setState({ warehouseNames: options });
      });
    });
  };
  handleChange(checked) {
    this.setState({ checked });
    console.log(checked);
    console.log(this.state.checked);
  }
}

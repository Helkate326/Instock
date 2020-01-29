import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uuid from "uuid";
import kebabIcon from "../assets/icons/SVG/Icon-kebab-default.svg";
import Create from "./Create";

function TableHeader() {
  return (
    <div className="inventory__table-header--nonMobile inventory__table-row">
      <label className="inventory__table-header-cell  inventory__table-cell--item">
        ITEM
      </label>
      <label className="inventory__table-header-cell inventory__table-cell--date">
        LAST ORDERED
      </label>
      <label className="inventory__table-header-cell inventory__table-cell--location">
        LOCATION
      </label>
      <label className="inventory__table-header-cell inventory__table-cell--quantity">
        QUANTITY
      </label>
      <label className="inventory__table-header-cell inventory__table-cell--status">
        STATUS
      </label>
    </div>
  );
}

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.showRemove = React.createRef();
  }
  render() {
    const product = this.props.product;
    return (
      <div className="inventory__table-row">
        {/* Row's regular cells */}
        <div className="inventory__table-row-cells--regular">
          <label className="inventory__table-header-cell--mobile"> ITEM</label>
          <div className="inventory__table-row-cell inventory__table-cell--item">
            <Link
              className="inventory__table-row-cell--name"
              to={`/inventory/${product.id}`}
            >
              {product.name}
            </Link>
            <p className="inventory__table-row-cell--description">
              {product.description}
            </p>
          </div>
          <label className="inventory__table-header-cell--mobile">
            LAST ORDERED
          </label>
          <p className="inventory__table-row-cell inventory__table-cell--date">
            {product.date}
          </p>
          <label className="inventory__table-header-cell--mobile">
            LOCATION
          </label>
          <p className="inventory__table-row-cell inventory__table-cell--location">
            {product.city}, {product.country}
          </p>
          <label className="inventory__table-header-cell--mobile">
            QUANTITY
          </label>
          <p className="inventory__table-row-cell inventory__table-cell--quantity">
            {product.quantity}
          </p>
          <label className="inventory__table-header-cell--mobile">STATUS</label>
          <p className="inventory__table-row-cell inventory__table-cell--status">
            {product.status}
          </p>
        </div>

        {/* Row's kebab icon and hidden button */}
        <div className="inventory__table-row-cells--hidden">
          <img
            className="inventory__table-row-kebab"
            src={kebabIcon}
            alt="Remove icon"
            onClick={this.handleKebab}
          />
          <div
            className="inventory__table-row-dropdown"
            ref={this.showRemove}
            style={{ display: "none" }}
          >
            <button
              className="inventory__table-row-btn"
              id={product.id}
              onClick={this.props.removeFunction}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleKebab = () => {
    let display = this.showRemove.current.style.display;
    display === "none"
      ? (this.showRemove.current.style.display = "block")
      : (this.showRemove.current.style.display = "none");
  };
}

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.addPage = React.createRef();
    this.state = {
      inventoryList: undefined
    };
  }

  render() {
    if (!this.state.inventoryList) return <>Loading...</>;
    else {
      let tableRows = this.state.inventoryList.map(product => {
        return (
          <TableRow
            product={product}
            key={uuid()}
            removeFunction={this.removeProduct}
          />
        );
      });
      return (
        <div className="inventory">
          <h1 className="inventory__title">Inventory</h1>
          <input className="inventory__search" placeholder="Search" />
          <div className="inventory__table">
            <TableHeader />
            <div className="inventory__Rows">{tableRows}</div>
            <button
              className="inventory__btn"
              onClick={this.showAddPage}
            ></button>
          </div>

          <div
            className="addPage"
            ref={this.addPage}
            style={{ display: "none" }}
          >
            <Create
              addFunction={this.addProduct}
              uploadCancel={this.hideAddPage}
            />
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/inventory")
      .then(response => this.setState({ inventoryList: response.data }));
  }

  removeProduct = event => {
    // event.preventDefault();
    const id = event.target.id;
    const url = `http://localhost:8080/inventory/${id}`;
    axios.delete(url).then(response => {
      this.setState({ inventoryList: response.data });
    });
  };

  addProduct = submit => {
    submit.preventDefault();
    const newProduct = {
      name: submit.target.name.value,
      date: submit.target.date.value,
      city: submit.target.city.value,
      country: submit.target.country.value,
      quantity: submit.target.quantity.value,
      status: submit.target.status.value,
      customer: submit.target.customer.value,
      description: submit.target.description.value,
      warehouse: submit.target.warehouse.value
    };
    axios.post("http://localhost:8080/inventory", newProduct).then(response => {
      this.setState({
        inventoryList: [...this.state.inventoryList, response.data]
      });
    });
    submit.target.reset();
    this.addPage.current.style.display = "none";
  };

  showAddPage = event => {
    event.preventDefault();
    this.addPage.current.style.display = "block";
  };

  hideAddPage = event => {
    event.preventDefault();
    this.addPage.current.style.display = "none";
  };
}

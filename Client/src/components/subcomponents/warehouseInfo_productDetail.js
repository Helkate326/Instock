import React, { Component } from "react";
import kebab from "../../assets/icons/SVG/Icon-kebab-default.svg";
import axios from "axios";

var windowWidth = window.innerWidth;
var foundElement = [];
var mobileflag = false;
var tabdeskflag = false;
var removeFlag = false;
export default class warehouseInfo_productDetail extends Component {
  state = {
    product: undefined,
    mobile: false,
    tabdesk: false
  };

  componentDidMount() {
    foundElement = [];
    if (!this.state.mobile && windowWidth < 768) {
      this.setState({ mobile: true });
      this.setState({ tabdesk: false });
    } else if (!this.state.tabdesk && windowWidth >= 768) {
      this.setState({ tabdesk: true });
      this.setState({ mobile: false });
    }
    axios.get("http://localhost:8080/locations/productInfo").then(response => {
      console.log(response.data);
      //find the element matches the name : only first one for mobile version

      response.data.map(element => {
        console.log(element.warehouse);
        console.log(this.props.name);
        if (element.warehouse === this.props.name) {
          foundElement.push(element);
        }
        return "";
      });
      let mobileContent = [];
      mobileContent.push(foundElement[0]);
      console.log(foundElement);
      if (this.state.mobile) {
        this.setState({
          product: mobileContent
        });
      } else {
        this.setState({
          product: foundElement
        });
      }
    });
  }

  componentWillUpdate() {
    window.addEventListener("resize", () => {
      windowWidth = window.innerWidth;
      if (!this.state.mobile && windowWidth < 768) {
        this.setState({ mobile: true });
        this.setState({ tabdesk: false });
      } else if (!this.state.tabdesk && windowWidth >= 768) {
        this.setState({ tabdesk: true });
        this.setState({ mobile: false });
      }
    });

    let mobileContent = [];
    mobileContent.push(foundElement[0]);
    if (this.state.mobile && !mobileflag) {
      mobileflag = true;
      tabdeskflag = false;
      this.setState({
        product: mobileContent
      });
    } else if (this.state.tabdesk && !tabdeskflag) {
      tabdeskflag = true;
      mobileflag = false;
      this.setState({
        product: foundElement
      });
    }
  }

  removeProduct = index => {
    // remove target from state.content
    console.log("la");
    let oldContent = this.state.product;
    console.log("lala");
    oldContent.splice(index, 1);
    console.log("lallala");

    axios
      .delete("http://localhost:8080/locations/content", oldContent)
      .then(response => {
        console.log(response.data);
        removeFlag = true;
        if (removeFlag) {
          console.log("try remove content");
          axios
            .get("http://localhost:8080/locations/productInfo")
            .then(response => {
              console.log(response.data);
              //find the element matches the name : only first one for mobile version
              foundElement = [];
              response.data.map(element => {
                console.log(element.warehouse);
                console.log(this.props.name);
                if (element.warehouse === this.props.name) {
                  foundElement.push(element);
                }
                return "";
              });
              let mobileContent = [];
              mobileContent.push(foundElement[0]);
              console.log(foundElement);
              if (this.state.mobile) {
                this.setState({
                  product: mobileContent
                });
              } else {
                this.setState({
                  product: foundElement
                });
              }
            });

          removeFlag = false;
        }
      });
  };

  outputProduct = () => {
    console.log(this.state.product);
    if (this.state.product[0] === undefined) {
      return <div>Product information Loading ... </div>;
    } else {
      console.log(this.state.product);
      return this.state.product.map((element, index) => {
        console.log(element);
        return (
          <div key={index} className={`productNumber__${index}`}>
            <div className="productDetail">
              <div className="productDetail__content">
                <div className="productDetail__left">
                  <div className="productDetail__left-item">
                    <div
                      className={`productDetail__left-item--label item-${index}`}
                    >
                      ITEM
                    </div>
                    <div className="productDetail__left-item--wrapper">
                      <div className="productDetail__left-item--name">
                        {element.name}
                      </div>
                      <div className="productDetail__left-item--description">
                        {element.description}
                      </div>
                    </div>
                  </div>

                  <div className="productDetail__left-date">
                    <div
                      className={`productDetail__left-date--label item-${index}`}
                    >
                      LAST ORDERED
                    </div>
                    <div className="productDetail__left-date--orderDate">
                      {element.date}
                    </div>
                  </div>

                  <div className="productDetail__left-location">
                    <div
                      className={`productDetail__left-location--label item-${index}`}
                    >
                      LOCATION
                    </div>
                    <div className="productDetail__left-location--name">
                      {element.city}
                    </div>
                  </div>

                  <div className="productDetail__left-quantity">
                    <div
                      className={`productDetail__left-quantity--label item-${index}`}
                    >
                      QUANTITY
                    </div>
                    <div className="productDetail__left-quantity--number">
                      {element.quantity}
                    </div>
                  </div>

                  <div className="productDetail__left-status">
                    <div
                      className={`productDetail__left-status--label item-${index}`}
                    >
                      STATUS
                    </div>
                    <div className="productDetail__left-status--state">
                      {element.status}
                    </div>
                  </div>
                </div>
                <button
                  className="productDetail__right"
                  onClick={() => {
                    alert(`Product with id : ${element.id} is removed`);
                    this.removeProduct(index);
                  }}
                >
                  <img
                    className="productDetail__right-icon"
                    alt="edit button"
                    src={kebab}
                  ></img>
                </button>
              </div>
              <hr className="detail-seperater"></hr>
            </div>
          </div>
        );
      });
    }
  };
  render() {
    if (this.state.product === undefined) {
      return <div>Loading ... </div>;
    } else {
      return <div>{this.outputProduct()}</div>;
    }
  }
}

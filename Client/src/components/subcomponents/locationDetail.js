import React, { Component } from "react";
import Arrow from "../../assets/icons/SVG/Icon-arrow-right.svg";
import axios from "axios";
import { Link } from "react-router-dom";

var windowWidth = window.innerWidth;

export default class locationDetail extends Component {
  state = { content: undefined, mobile: false, tabdesk: false };

  componentDidMount() {
    axios.get("http://localhost:8080/locations/content").then(response => {
      this.setState({ content: response.data });
    });
    if (!this.state.mobile && windowWidth < 768) {
      this.setState({ mobile: true });
      this.setState({ tabdesk: false });
    } else if (!this.state.tabdesk && windowWidth >= 768) {
      this.setState({ tabdesk: true });
      this.setState({ mobile: false });
    }
  }

  componentWillUpdate() {
    this.props.flag.current.addEventListener("submit", () => {
      axios.get("http://localhost:8080/locations/content").then(response => {
        this.setState({ content: response.data });
      });
    });

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
  }

  categoryLayout = content => {
    let lineOneContent;
    let lineTwoContent;
    if (this.state.mobile) {
      console.log("Mobile version now");
      lineOneContent =
        content.categories[0] +
        " ," +
        content.categories[1] +
        " ," +
        content.categories[2] +
        " ," +
        content.categories[3];

      lineTwoContent = content.categories[4] + " ," + content.categories[5];
    } else if (this.state.tabdesk) {
      console.log("Tablet and Desktop version now");
      lineOneContent =
        content.categories[0] +
        " ," +
        content.categories[1] +
        " ," +
        content.categories[2];

      lineTwoContent = content.categories[3] + " ," + content.categories[4];
    }
    let lineOne = (
      <div className="location__content-detail--left--categories--lineOne">
        {lineOneContent}
      </div>
    );
    let lineTwo = (
      <div className="location__content-detail--left--categories--lineTwo">
        {lineTwoContent}
      </div>
    );

    return (
      <div className="location__content-detail--left--categories">
        <div className="desktop__title">CATEGORIES</div>
        {lineOne}
        {lineTwo}
      </div>
    );
  };
  render() {
    if (this.state.content === undefined) {
      return <div>Loading...</div>;
    } else {
      return this.state.content.map((element, index) => {
        return (
          <div className="location__content-wrapper" key={index}>
            <div className="location__content-detail">
              <div className="location__content-detail--left">
                <div className="location__content-detail--left--geo">
                  <div className="desktop__title">WAREHOUSE</div>
                  <div className="location__content-detail--left--geo--warehouse">
                    {element.warehouse}
                  </div>
                  <div className="location__content-detail--left--geo--address">
                    {element.address}
                  </div>
                </div>
                <div className="location__content-detail--left--wrapper">
                  <div className="location__content-detail--left--manager">
                    <div className="desktop__title">CONTACT</div>
                    <div className="location__content-detail--left--manager--name">
                      {element.contact}
                    </div>
                    <div className="location__content-detail--left--manager--role">
                      {element.role}
                    </div>
                  </div>

                  <div className="location__content-detail--left--contact">
                    <div className="desktop__title">CONTACT INFORMATION</div>
                    <div className="location__content-detail--left--contact--phone">
                      {element.phone}
                    </div>
                    <div className="location__content-detail--left--contact--email">
                      {element.email}
                    </div>
                  </div>

                  {this.categoryLayout(element)}
                </div>
              </div>

              <div className="location__content-detail--right">
                <Link
                  to={`/locations/detail/${element.warehouse}`}
                  className="warehouse__link"
                >
                  <div className="location__content-detail--arrow">
                    <img
                      className="location__content-detail--arrow--icon"
                      src={Arrow}
                      alt="Right Arrow"
                    ></img>
                  </div>
                </Link>
              </div>
            </div>
            <hr className="location__content-seperater"></hr>
          </div>
        );
      });
    }
  }
}

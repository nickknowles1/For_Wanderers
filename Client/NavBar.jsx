import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="nav-bar-div">
        <h1 className="bucket-list">For Wanderers</h1>
        <div className="login-container">
          <button className="login-button">Sign Out</button>
        </div>
      </div>
    )
  }
}

export default NavBar;
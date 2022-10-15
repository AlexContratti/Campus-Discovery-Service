import logo from '../logo.svg';
import './Homepage.css';
import {Link } from "react-router-dom";


import React from "react"

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="homepage-header"> Welcome to DiscoverGT </div>
      <Link to="/Start">
          <button className="home-button">
              Click here to start!
          </button>
      </Link>
    </div>
  );
}

export default Homepage;

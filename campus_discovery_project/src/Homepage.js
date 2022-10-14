import logo from './logo.svg';
import {Link } from "react-router-dom";

import React from "react"

function Homepage() {
  return (
    <div className="App">
      <header>
        Welcome to DiscoverGT
      </header>
      <Link to="/Start"><button>
              Click here to start!
        </button>
        </Link>
    </div>
  );
}

export default Homepage;

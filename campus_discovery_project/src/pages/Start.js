import React from "react"
import {Link } from "react-router-dom";
import './Start.css';


function Start() {
    return (
        <div className="start-container">
            <Link to="/">
                <button className="exit-button"> Exit </button>
            </Link>
            <div className="login-buttons">
                <Link to="/login">
                    <button className="start-button"> Login </button> 
                </Link>
                <Link to="/config">
                    <button className="start-button"> Make Account </button>
                </Link>
            </div>
        </div>
    );
}

export default Start;
import React from "react"
import {Link } from "react-router-dom";
import './Start.css';


function Start() {
    return (
        <div className="start-container">
            <div className="exit-button">
                <Link to="/"><button> Exit the game </button></Link>
            </div>
            <div className="start-button">
                <Link to="/login"><button> Login </button> </Link>
            </div>
            <div className="start-button"> 
                <Link to="/config"><button> Make Account </button></Link>
            </div>
        </div>
    );
}

export default Start;
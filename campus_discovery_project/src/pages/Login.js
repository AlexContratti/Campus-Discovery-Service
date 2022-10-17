import React from "react"
import {Link } from "react-router-dom";
import "./Login.css";


function Login() {
    return (
        <div className="login-container">
            <div>
                <Link to="/"> <button className="exit-button"> Exit </button> </Link>
            </div>
            <div className = "input-container">
                <div className="header"> Login </div>
                <div className="label"> Username: </div>
                <label className="input">
                    <input type = "text" name = "username"></input>
                </label>
                <div className="label"> Password: </div>
                <label className="input">
                    <input type = "text" name = "password"></input>
                </label>
                    
                <Link to="/Events"><button className="login-button">
                    Submit
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
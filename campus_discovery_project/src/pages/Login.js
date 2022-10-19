import React from "react"
import {Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
    var username
    var password
    const navigate = useNavigate()
    const handleSubmitClick = () => {
        if (username.length === 0 || password.length === 0) {
            navigate('/Login')
        } else {
            navigate('/Events')
        }
    }
    
    return (
        <div className="login-container">
            <div>
                <Link to="/"> <button className="exit-button"> Exit </button> </Link>
            </div>
            <div className = "input-container">
                <div className="header"> Login </div>
                <form>
                    <div className="label"> Username: </div>
                    <label className="input">
                        <input type = "text" name = "username" placeholder = "Enter Username" onChange={e => username = e.target.value}></input>
                    </label>
                    <div className="label"> Password: </div>
                    <label className="input">
                        <input type = "text" name = "password" placeholder = "Enter Password" onChange={e => password = e.target.value}></input>
                    </label>
                </form>

                <button className="login-button" onClick={handleSubmitClick}> Submit </button>
                
            </div>
        </div>
    );
}

export default Login;
import React from "react"
import {Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const handleSubmitClick = () => {
        navigate('/Events')
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
                        <input type = "text" name = "username"></input>
                    </label>
                    <div className="label"> Password: </div>
                    <label className="input">
                        <input type = "text" name = "password"></input>
                    </label>
                </form>

                <button className="login-button" onClick={handleSubmitClick}> Submit </button>
                
            </div>
        </div>
    );
}

export default Login;
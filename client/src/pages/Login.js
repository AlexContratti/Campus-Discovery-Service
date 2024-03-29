import React, {useState} from "react"
import {Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import {setUserName} from "../components/GlobalUser"

function Login() {
    const navigate = useNavigate()
    const [validateLogin, setValidateLogin] = useState(403);

    const handleSubmitClick = (event) => {
        if (document.getElementById("username").value.length === 0 ||  document.getElementById("password").value.length === 0) {
            navigate('/Login')
        } else {
            const options = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value,
                })
            }
            fetch("http://localhost:3001/login", options)
                .then(response => {
                    if (response.status == 200) {
                        setUserName(document.getElementById("username").value)
                        navigate('/Events')
                    } else {
                        alert("Invalid Login")
                    }
                })
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
                        <input type = "text" id = "username" name = "username" placeholder = "Enter Username"></input>
                    </label>
                    <div className="label"> Password: </div>
                    <label className="input">
                        <input type = "text" id = "password" name = "password" placeholder = "Enter Password"></input>
                    </label>
                </form>

                <button type = "submit" className="login-button" onClick={handleSubmitClick}> Submit </button>
                
            </div>
        </div>
    );
}

export default Login;
import React from "react"
import {Link } from "react-router-dom";
import './Config.css';
import { useNavigate } from 'react-router-dom';


function Config() {
    var type;
    const navigate = useNavigate()
    const handleSubmitClick = (event) => {
        if (document.getElementById("name").value.length === 0 || 
            document.getElementById("username").value.length === 0 || 
            document.getElementById("password").value.length === 0) {
            navigate('/Config')
        } else {
            const options = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value,
                    type: type
                })
            }
            fetch("http://localhost:3001/register", options)
                .then(response => response.json())
            navigate('/Events')
        }
    }

    return (
        <div className="config-container">
            <div>
                <Link to="/"> <button className="exit-button"> Exit </button> </Link>
            </div>
            <div className = "input-container">
                <div className="header"> Create New Account </div>
                <form>

                    <div className="label"> Name: </div>
                    <label>
                        <input type = "text" id = "name" name = "name" placeholder = "Enter Name"></input>
                    </label>
                    
                    <div className="label"> Who are you: </div>
                    <label>
                        <select className="select" onChange={e => type = e.target.value}>
                            <option value = "Student">Student</option>
                            <option value = "Teacher">Teacher</option>
                            <option value = "Organizer">Organizer</option>
                        </select>
                    </label>
                    
                    <div className="label"> Username: </div>
                    <label>
                        <input type = "text" name = "username" placeholder = "Enter Username" id = "username"></input>
                    </label>
                   
                    <div className="label"> Password: </div>
                    <label>
                        <input type = "text" name = "password" placeholder = "Enter Password" id = "password"></input>
                    </label>
                </form>
                   
                <button type = "submit" className="submit" onClick={handleSubmitClick}> Submit </button>
                
            </div>
        </div>
    );
}

export default Config;
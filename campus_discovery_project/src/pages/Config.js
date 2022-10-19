import React from "react"
import {Link } from "react-router-dom";
import './Config.css';
import { useNavigate } from 'react-router-dom';


function Config() {
    var name
    var username
    var password
    const navigate = useNavigate()
    const handleSubmitClick = () => {
        if (name.length === 0 || username.length === 0 || password.length === 0) {
            navigate('/Config')
        } else {
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
                        <input type = "text" name = "name" placeholder = "Enter Name" onChange={e => name = e.target.value}></input>
                    </label>
                    
                    <div className="label"> Who are you: </div>
                    <label>
                        <select className="select">
                            <option value = "Student">Student</option>
                            <option value = "Teacher">Teacher</option>
                            <option value = "Organizer">Organizer</option>
                        </select>
                    </label>
                    
                    <div className="label"> Username: </div>
                    <label>
                        <input type = "text" name = "username" placeholder = "Enter Username" onChange={e => username = e.target.value}></input>
                    </label>
                   
                    <div className="label"> Password: </div>
                    <label>
                        <input type = "text" name = "password" placeholder = "Enter Password" onChange={e => password = e.target.value}></input>
                    </label>
                </form>
                   
                <button className="submit" onClick={handleSubmitClick}> Submit </button>
                
            </div>
        </div>
    );
}

export default Config;
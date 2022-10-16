import React from "react"
import {Link } from "react-router-dom";


function Config() {
    return (
        <div className="config-container">
            <div>
                <Link to="/"><button> Exit </button> </Link>
            </div>
            <div className = "App">
                <header> Initial Configuration Screen </header>
                <br></br><br></br>
                <form>
                    <label>
                        Name:
                        <input type = "text" name = "name"></input>
                    </label>
                    <br></br>
                    <label>
                        Who are you:
                        <select>
                            <option value = "Student">Student</option>
                            <option value = "Teacher">Teacher</option>
                            <option value = "Organizer">Organizer</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>
                        Username:
                        <input type = "text" name = "username"></input>
                    </label>
                    <br></br>
                    <label>
                        Password:
                        <input type = "text" name = "password"></input>
                    </label>
                    <br></br><br></br>
                    <Link to="/Events"><button>
                        Submit
                    </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Config;
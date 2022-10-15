import React from "react"
import {Link } from "react-router-dom";


function Login() {
    return (
        <div>
        <div>
            <Link to="/"><button>
              Exit the game
        </button>
        </Link>
        </div>
        <div className = "App">
            <header>
                Login
            </header>
            <br></br><br></br>
            <form>
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

export default Login;
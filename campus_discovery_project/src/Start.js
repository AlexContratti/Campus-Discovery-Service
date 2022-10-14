import React from "react"
import './App.css';
import {Link } from "react-router-dom";


function Start() {
    return (
        <div>
        <div>
            <Link to="/"><button>
              Exit the game
        </button>
        </Link>
        </div>
        <br></br><br></br>
        <div>
            <Link to="/login"><button>
              Login
        </button>
        </Link>
        </div>
        <br></br><br></br>
        <div>
            <Link to="/config"><button>
              Make Account
        </button>
        </Link>
        </div>
        </div>
    );
}

export default Start;
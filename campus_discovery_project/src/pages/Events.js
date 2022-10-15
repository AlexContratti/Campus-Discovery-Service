import React from "react"
import {Link } from "react-router-dom";


function Events() {
    return (
        <div>
        <div>
            <Link to="/"><button>
              Exit the game
        </button>
        </Link>
        </div>
        <div className = "App-header">
            <header>
                Events Page
            </header>
        </div>
        </div>
    );
}

export default Events;
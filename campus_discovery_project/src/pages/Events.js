import React from "react"
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';


function Events() {
    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar/></div>
            <div className = "events">
                <div className="pageheader"> Events </div>
            </div>
        </div>
    );
}

export default Events;
import React from "react"
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';



function Events() {
    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar/></div>
            <div className = "events">
                <div className="pageheader"> Events </div>
                <div className="tool-bar">
                    <div className="add-button"> <AddIcon/> Add Event </div>
                    {/*<div className="delete-button" onClick={() => setShowModal(true)}>Delete</div>*/}
                </div>
            </div>
        </div>
    );
}

export default Events;
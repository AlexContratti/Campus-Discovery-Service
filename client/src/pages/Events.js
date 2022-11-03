import React, { Fragment, useEffect, useState } from 'react'
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";
import DeleteIcon from '@mui/icons-material/Delete';

function Events() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    var modal = false;
    useEffect( () => {fetch("/events").then(res => res.json()).then(data => setData(data))}, []);
    console.log(data)

    const handleAddEvent = async () => {
        setShowModal(false)
        try{
            const add = await fetch("/createEvent", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: document.getElementById("eventName").value,
                    host: document.getElementById("host").value,
                    location: document.getElementById("location").value,
                    dateTime: document.getElementById("dateTime").value,
                    description: document.getElementById("description").value,
                })
            })
        console.log(add)
        } catch(err){
            console.error()
        }
    }

    const handleEventDelete = async (e) => {
        try{
            const user = await fetch("/users", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:"Host",
                })
            })

            console.log(user)
            const event = await fetch("/event", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: e.target.id,
                })
            })
            console.log(event)

            if (user.type === "Organizer" || user.name === event.host) {
                console.log("if")
                const del = await fetch("/event", {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        eventName: e.target.id,
                    })
                })
            }
        } catch(err){
            console.error()
        }
    }

    const handleEditEvent = async () => {
        setShowModal(false);
        try{
            const add = await fetch("/events", {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: document.getElementById("eventName").value, 
                    updates: {
                    host: document.getElementById("host").value,
                    location: document.getElementById("location").value,
                    dateTime: document.getElementById("dateTime").value,
                    description: document.getElementById("description").value }
                })
            })
        console.log(add)
        } catch(err){
            console.error()
        }
    }


    const events = [
        ["title1", "host1", "descipriton1", "location1", "date/time1"],
        ["title2", "host1", "descipriton1", "location1", "date/time1"],
        ["title3", "host1", "descipriton1", "location1", "date/time1"],
        ["title4", "host1", "descipriton1", "location1", "date/time1"],
        ["title5", "host1", "descipriton1", "location1", "date/time1"],
        ["title6", "host1", "descipriton1", "location1", "date/time1"],
        ["title7", "host1", "descipriton1", "location1", "date/time1"],
        ["title8", "host1", "descipriton1", "location1", "date/time1"],
        ["title9", "host1", "descipriton1", "location1", "date/time1"],
        ["title10", "host1", "descipriton1", "location1", "date/time1"],
        ["title11", "host1", "descipriton1", "location1", "date/time1"],
        ["title12", "host1", "descipriton1", "location1", "date/time1"],
        ["title13", "host1", "descipriton1", "location1", "date/time1"],
        ["title14", "host1", "descipriton1", "location1", "date/time1"],
        ["title15", "host1", "descipriton1", "location1", "date/time1"],
        ["title16", "host1", "descipriton1", "location1", "date/time1"]
    ]

    const modalHandler = (event) => {
        console.log(event.target.id)
        modal = document.getElementById(event.target.id + "-modal")
        modal.style.display = "block"
    }

    const close = (event) => {
        modal.style.display = "none"
    }


    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar/></div>
            <div className = "events">
                <div className="pageheader"> Events </div>
                <div className="tool-bar">
                    <div className="add-button" onClick={() => setShowModal(true)}> <AddIcon/> Add Event </div>
                    <Modal title="Add" show={showModal} setShow={setShowModal}>
                        <AddEvent addEvent={handleAddEvent}/>
                    </Modal>
                    {/*<div className="delete-button" onClick={() => setShowModal(true)}>Delete</div>*/}
                </div>
                
                <div className="grid-container">
                    { data === null ? "" : data.map(event => (
                        
                            <section>
                                <div className="card">
                                    <h5>{event.name}</h5>
                                    <p>{event.host}</p>
                                    <p>{event.location}</p>
                                    <p>{event.time}</p>
                                    <p>{event.description}</p> 
                                    <button type = "button" id = {event.name} onClick = {modalHandler}>Find Out More</button>{' '}
                                    <button type = "button" id = {event.name} onClick = {handleEventDelete}>Delete</button>{' '}
                                    <div type="button" className="edit-button" onClick={() => setShowModal(true)}> Edit Event </div>
                                        <Modal title="Edit" show={showModal} setShow={setShowModal}>
                                            <AddEvent addEvent={handleEditEvent}/>
                                        </Modal>
                                    {/*
                                    <div onClick={handleEventDelete}>
                                        <DeleteIcon type="button" pointerEvents="none"></DeleteIcon>
                                    </div>
                    */}
                                </div>
                                <div id={event.name+"-modal"} class="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={close}>
                                            &times;
                                        </span>
                                        <Modal event = {event}/>
                                    </div>
                                </div>
                            </section>
                        
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Events;
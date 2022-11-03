import React, { Fragment, useEffect, useState } from 'react'
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";
import DeleteIcon from '@mui/icons-material/Delete';
import {getInfo} from "../components/GlobalUser"

function Events() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDesModal, setShowDesModal] = useState(false);
    const [data, setData] = useState(null);
    var modal = null
    useEffect( () => {fetch("/events").then(res => res.json()).then(data => setData(data))}, []);

    const handleAddEvent = async () => {
        setShowModal(false)
        let userInfo = await getInfo()
        try{
            const add = await fetch("/createEvent", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: document.getElementById("eventName").value,
                    host: userInfo[1],
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
            /* const user = await fetch("/users", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:"Host",
                })
            }) */
            let event = ""
            const ev = await fetch("/event", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: e.target.id,
                })
            }).then(res => res.json()).then(data => event = data[0])
            let userInfo = await getInfo()

            console.log(userInfo[2], userInfo[1], event.host)
            if (userInfo[2] === "Organizer" || userInfo[1] === event.host) {
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
        setShowEditModal(false);
        try{
            console.log("handler")
            const add = await fetch("/events", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: document.getElementById("eventName").value, 
                    updates: {
                    host: document.getElementById("host").value,
                    location: document.getElementById("location").value,
                    dateTime: document.getElementById("dateTime").value,
                    description: document.getElementById("description").value }
                })
            }).then(res => res.json())
            console.log("end")
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
        document.getElementById(event.target.id+"-modal").show = true;
        //setShowDesModal(true);
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
                        
                        <section className='tile'>
                            <div className="card">
                                <h2>{event.name}</h2>
                                <p>{event.time}</p>
                                <p>{event.description}</p> 
                                <button type = "button" id = {event.name} onClick = {modalHandler}>Find Out More</button>{' '}
                                <button type = "button" id = {event.name} onClick = {handleEventDelete}>Delete</button>{' '}
                                <div type="button" className="edit-button" onClick={() => setShowEditModal(true)}> Edit Event </div>
                                <Modal title="Edit" show={showEditModal} setShow={setShowEditModal}>
                                    <AddEvent addEvent={handleEditEvent}/>
                                </Modal>
                                    {/*
                                    <div onClick={handleEventDelete}>
                                        <DeleteIcon type="button" pointerEvents="none"></DeleteIcon>
                                    </div>
                    */}
                            </div>

                            {/* <Modal id = {event.name+"-modal"} show={showDesModal} setShow={setShowDesModal}>
                                <div className='des-modal-content'>
                                    <h2>{event.name}</h2>
                                    <p>Host: {event.host}</p>
                                    <p>Location: {event.location}</p>
                                    <p>Date&Time: {event.time}</p>
                                    <p>Description: {event.description}</p> 
                                </div>
                            </Modal> */}

                            
                            <div id={event.name+"-modal"} class="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={close}>
                                        &times;
                                    </span>
                                    <div className='des-modal-content'>
                                        <h2>{event.name == null ? "No name" : event.name}</h2>
                                        <p>Host: {event.host == null ? "No host" : event.host}</p>
                                        <p>Location: {event.location == null ? "No location" : event.location}</p>
                                        <p>Date&Time: {event.time == null ? "No time" : event.time}</p>
                                        <p>Description: {event.description == null ? "No description" : event.description}</p> 
                                    </div>
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
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar';
import './Events.css';


function Registered() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    // const cleanData = (d) => {
    //     finalEvents = []
    //     d.forEach(event => {
    //         if (event.rsvp.Yes.includes(localStorage.getItem("name"))) {
    //             finalEvents.push(event)
    //             console.log(event)
    //         }
    //     })
    //     console.log(finalEvents)
    //     setData(finalEvents)
    // }

    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar/></div>
            <div className = "events">
                <div className="pageheader"> Registered Events </div>
                <div>
                    {data === null ? "" : data.map(event => 
                        {if (event.rsvp.Yes.includes(localStorage.getItem("name"))) {
                            return (<section>
                                <h4>{event.name}</h4>
                            </section>)
                        }}
                    )}
                </div>
            </div>
        </div>
    );
}

export default Registered;
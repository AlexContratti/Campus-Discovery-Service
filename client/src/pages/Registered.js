import React, { Fragment, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar';
import './Events.css';


function Registered() {
    const [data, setData] = useState([]);
    const [conflict, setConflict] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then(res => res.json())
            .then(data => setData(data.sort(function(a, b){return a.time.localeCompare(b.time)})))
    }, [])

    useEffect(() => {
        let c = []
        for (let i = 1; i < data.length; i++) {
            if (data[i - 1].endTime === undefined || data[i].endTime === undefined) {
                continue
            }
            if (data[i].time.localeCompare(data[i - 1].time) > 0 && data[i].time.localeCompare(data[i - 1].endTime) < 0) {
                c.push(data[i].name)
                c.push(data[i - 1].name)
            }
        }
        console.log(c)
        setConflict(c)
    }, [data])

    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar/></div>
            <div className = "events">
                <div className="pageheader"> Registered Events </div>
                <div>
                    {data === null ? "" : data.map(event => 
                        {if (event.rsvp.Yes.includes(localStorage.getItem("name")) && !conflict.includes(event.name)) {
                            return (<section>
                                <h4>{event.name}</h4>
                            </section>)
                        } else if (event.rsvp.Yes.includes(localStorage.getItem("name"))) {
                            return (
                                <section>
                                    <h4>{event.name + " " + "CONFLICT"}</h4>
                                </section>
                            )
                        }}
                    )}
                </div>
            </div>
        </div>
    );
}

export default Registered;
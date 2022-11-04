import React, {useState} from 'react'
import './AddEvent.css'
import CheckIcon from '@mui/icons-material/Check';

function AddEvent ({addEvent, eventName, setEventName, location, setLocation, dateTime, setDateTime, desc, setDesc}) {

    return (
      <div className="add-event-container">
        <div className='input-container'>
            <div className='input'>
                <div className='title'>Event Name:</div>
                <input type='text' id="eventName" className='input-text' autoFocus={true} onChange={e => setEventName(e.target.value)}></input>
            </div>
{/*             <div className='input'>
                <div className='title'>Host:</div>
                <input type='text' id="host" className='input-text'></input>
            </div> */}
            <div className='input'>
                <div className='title'>Location:</div>
                <input type='text' id="location" className='input-text'  onChange={e => setLocation(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Date/Time:</div>
                <input type='text' id="dateTime" className='input-text' onChange={e => setDateTime(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Description:</div>
                <input type='text' id="description" className='input-text' onChange={e => setDesc(e.target.value)}></input>
            </div>
        
        <div className="save-button" onClick={addEvent}> <CheckIcon/> Save & Publish </div>
            
        </div>
        {/*
        <div className="buttons">
          <div className="button" onClick={deleteAccount}>Delete Account</div>
          <div className="button" onClick={deleteApplication}>Delete Application</div>
        </div>
        */}
      </div>
    )
}

export default AddEvent;
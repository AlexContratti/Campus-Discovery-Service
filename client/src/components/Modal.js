import React from 'react'
import './Modal.css'

export default function Modal ({ title, show, setShow, children }) {
  return show ? (
    <div className="modal-background">
      <div className="modal-container">
        <div className="header">
          <div className="title">{title}</div>
          <div className="close" onClick={() => setShow(false)}>x</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null
}

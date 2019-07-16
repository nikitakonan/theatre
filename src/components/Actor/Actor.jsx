import React from 'react';
import './actor.css';

const SHOW_PHONES = false;

const Actor = ({ name, color, phone, seats }) => (
    <div>
        <div className="color" style={{ backgroundColor: color }}>
        </div>
        {name} {SHOW_PHONES ? `(${phone})` : ''} - {seats ? seats.length : 0}
    </div>
)

export default Actor;

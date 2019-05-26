import React  from 'react';
const SHOW_PHONES = false;

export function Actor({ name, color, phone, seats }) {
    return (
        <div>
            <div className="color" style={{ backgroundColor: color }}>
            </div>
            {name} {SHOW_PHONES ? `(${phone})` : ''} - {seats ? seats.length : 0}
        </div>
    )
}

import React  from 'react';
import PropTypes from 'prop-types';
import './actors.css';

const SHOW_PHONES = false;

function Actor({ name, color, phone, seats }) {
    return (
        <div>
            <div className="color" style={{ backgroundColor: color }}>
            </div>
            {name} {SHOW_PHONES ? `(${phone})` : ''} - {seats.length}
        </div>
    )
}

export function Actors({ actors }) {
    return (
        <ul>
            {actors.map((actor) => (
                <li key={actor.name}>
                    <Actor {...actor}/>
                </li>
            ))}
        </ul>
    );
}

Actors.propTypes = { actors: PropTypes.array };

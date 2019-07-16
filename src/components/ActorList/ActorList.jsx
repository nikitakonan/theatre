import React from 'react';
import { Actor } from "..";

const ActorList = ({ actors }) => {
    return (
        <ol>
            {actors.map(actor => (
                <li key={actor.id}>
                    <Actor {...actor} />
                </li>
            ))}
        </ol>
    )
}

export default ActorList;
import React from 'react';
import { Actor } from "..";

const ActorList = ({ actors }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'auto',
        padding: '10px'
    }}>
        {actors.map(actor => (
            <Actor key={actor.id} {...actor} />
        ))}
    </div>
);

export default ActorList;
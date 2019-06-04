import React from 'react';
import { Row } from "./Row";
import './stage.css';

export function Stage({ rows, onClick }) {
    return (
        <div className="stage">
            {
                rows.map(({ number, seats }, i, all) => {
                    const prevSeatsNum = all[i - 1] && all[i - 1].seats.length;
                    const shouldOffset = prevSeatsNum === seats.length && i % 2 !== 0;
                    const rightOffset = shouldOffset ? 30 : 0;
                    return (
                        <Row key={number}
                             onClick={onClick}
                             seats={seats}
                             number={number}
                             rightOffset={rightOffset}/>
                    );
                })
            }
        </div>
    );
}

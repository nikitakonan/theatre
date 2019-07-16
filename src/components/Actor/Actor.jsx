import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import './actor.css';

const SHOW_PHONES = false;

const Actor = ({ name, color, phone, seats }) => (
    <Card style={{ margin: '5px', backgroundColor: '#eee' }}>
        <CardHeader title={`${name}(${seats ? seats.length : 0})`} color={color} />
        <CardContent>
            <div className="color" style={{ backgroundColor: color }}></div>
            <Typography variant="body2">
                {SHOW_PHONES ? phone : null}
            </Typography>
        </CardContent>
    </Card>
);

export default Actor;

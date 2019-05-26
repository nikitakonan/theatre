import React, { Component } from 'react';
import { getStageRows } from "../getState";
import { getActors } from "../api";
import { Stage } from "../Stage/Stage";
import { Actors } from "../Actors/Actors";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: getStageRows(),
            actors: [],
            isLoading: false
        };
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        getActors().then(actors => {
            const rows = this.state.rows.map(row => ({
                ...row,
                seats: row.seats.map(seat => ({
                    ...seat,
                    actor: findActor(actors, row.number, seat.number)
                }))
            }));
            this.setState({
                rows,
                actors,
                isLoading: false
            })
        })
    }
    render() {
        const { rows, actors, isLoading } = this.state;
        return (
            <div>
                <h1>Tickets</h1>
                <Stage rows={rows}/>
                {isLoading && <div>Loading...</div>}
                <Actors actors={actors} />
            </div>
        );
    }
}

function findActor(actors, row, seat) {
    return actors.find(actor => {
        const actorSeats = actor.seats;
        return actorSeats.some(st => st.row === row && st.seat === seat);
    });
}

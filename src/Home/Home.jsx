import React, { Component } from 'react';
import { getStageRows } from "../getState";
import { addActor, getActors } from "../api";
import { Stage } from "../Stage/Stage";
import { Actors } from "../Actors/Actors";
import { ActorsDropdown } from "../ActorsDropdown/ActorsDropdown";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: getStageRows(),
            actors: [],
            isLoading: false,
            selectedActor: null,
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
    handleAddActor(actor) {
        addActor(actor).then(() => {
            this.setState({
                actors: [
                    ...this.state.actors,
                    actor
                ]
            })
        });
    }
    handleActorChanged(actor) {
        this.setState({
            selectedActor: actor
        })
    }
    render() {
        const { rows, actors, isLoading, selectedActor } = this.state;
        return (
            <div>
                <h1>Tickets</h1>
                <ActorsDropdown selected={selectedActor}
                                actors={actors}
                                onChange={this.handleActorChanged.bind(this)}/>
                <Stage rows={rows}/>
                {isLoading && <div>Loading...</div>}
                <Actors onAdd={this.handleAddActor.bind(this)} actors={actors} />
            </div>
        );
    }
}

function findActor(actors, row, seat) {
    return actors.find(actor => {
        const actorSeats = actor.seats || [];
        return actorSeats.some(st => st.row === row && st.seat === seat);
    });
}

import React, { Component } from 'react';
import { getStageRows } from "../getState";
import { addActor, getActors } from "../api";
import { Stage } from "../Stage/Stage";
import { Actors } from "../Actors/Actors";

class ActorsDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: []
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            actors: [
                {
                    id: 'unique_key',
                    name: 'none',
                    value: ''
                },
                ...props.actors
            ]
        }
    }
    handleActorChanged(event) {
        const { onChange } = this.props;
        const { actors } = this.state;
        const id = event.target.value;
        const actor = id === 'unique_key' ? null : actors.find(a => a.id === id);
        typeof onChange === 'function' && onChange(actor);
    }
    render() {
        const { selected } = this.props;
        const { actors } = this.state;
        return (
            <select value={selected ? selected.id : 'unique_key'}
                    onChange={this.handleActorChanged.bind(this)}>
                {actors.map(actor =>
                    <option key={actor.id} value={actor.id}>{actor.name}</option>
                )}
            </select>
        );
    }
}

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

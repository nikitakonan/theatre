import { render } from 'react-dom';
import React, { Component } from 'react';
import './index.css';
import { Stage } from "./Stage/Stage";
import { getStageRows } from "./getState";
import { Actors } from "./Actors/Actors";
import { getActors } from "./api";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: getStageRows(),
            actors: [],
            isLoading: false
        };
        this.handleOnBuy = this.handleOnBuy.bind(this);
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
    handleOnBuy(data) {
        const { rows } = this.state;
        const rowIndex = rows.findIndex(r => r.number === data.row);
        const row = rows[rowIndex];
        const seatIndex = row.seats.findIndex(s => s.number === data.seat);
        const seat = row.seats[seatIndex];

        const newRow = {
            ...row,
            seats: [
                ...row.seats.slice(0, seatIndex),
                {
                    ...seat,
                    isBought: !seat.isBought
                },
                ...row.seats.slice(seatIndex + 1)
            ]
        };
        this.setState({
            rows: [
                ...rows.slice(0, rowIndex),
                newRow,
                ...rows.slice(rowIndex + 1)
            ]
        })
    }
    render() {
        const { rows, actors, isLoading } = this.state;
        return (
            <div>
                <h1>Tickets</h1>
                <Stage rows={rows} onBuy={this.handleOnBuy}/>
                {isLoading && <div>Loading...</div>}
                <Actors actors={actors} />
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'));

function findActor(actors, row, seat) {
    return actors.find(actor => {
        const actorSeats = actor.seats;
        return actorSeats.some(st => st.row === row && st.seat === seat);
    });
}

import React, { Component } from 'react';
import { getActors } from "../../api";
import { Stage } from "../Stage/Stage";
import { ActorsDropdown } from "../ActorsDropdown/ActorsDropdown";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.handleActorChanged = this.handleActorChanged.bind(this);
        this.handleStageClick = this.handleStageClick.bind(this);
        this.handleChangeEditMode = this.handleChangeEditMode.bind(this);
        this.state = {
            isEditMode: true,
            actors: [],
            selectedActor: null,
            assignedSeats: []
        };
    }
    componentDidMount() {
        getActors().then(actors => {
            this.setState({
                actors,
            })
        })
    }
    handleActorChanged(actor) {
        this.setState({
            selectedActor: actor
        })
    }
    handleChangeEditMode() {
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode
        }));
    }
    handleStageClick({ id, row, seat }) {
        if (!this.state.isEditMode) {
            return;
        }
        this.setState(prevState => {
            const { assignedSeats, selectedActor } = prevState;
            const existing = assignedSeats.find(assignedSeat => assignedSeat.id === id);
            if (existing) {
                if (selectedActor) {
                    existing.actor = selectedActor;
                } else {
                    const seatIndex = assignedSeats.indexOf(existing);
                    assignedSeats.splice(seatIndex, 1);
                }
            } else {
                if (selectedActor) {
                    assignedSeats.push({
                        actor: selectedActor,
                        id,
                        row,
                        seat
                    });
                }
            }
            return prevState;
        });
    }
    render() {
        const { assignedSeats, actors, selectedActor, isEditMode } = this.state;
        return (
            <div>
                <h1>Билеты{isEditMode && ' (редактирование)'}</h1>
                <div>
                    <label htmlFor="edit-mode-input">
                        Режим редактирования
                        <input id="edit-mode-input" type="checkbox" checked={isEditMode} onChange={this.handleChangeEditMode} />
                    </label>
                </div>
                <ActorsDropdown selected={selectedActor}
                    actors={actors}
                    onChange={this.handleActorChanged} />
                {selectedActor &&
                    <div style={{ display: 'inline' }}>
                        <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            display: 'inline-block',
                            backgroundColor: selectedActor.color
                        }}></div>
                        {selectedActor.name}
                    </div>}
                <Stage assignedSeats={assignedSeats} onClick={this.handleStageClick} />
            </div>
        );
    }
}

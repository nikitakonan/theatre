import React, { Component } from 'react';
import { getActors, getAssignedSeats, assignSeat, removeSeat, clearSeats, assignSeats } from "../../api";
import { Stage } from "../Stage/Stage";
import { ActorsDropdown } from "../ActorsDropdown/ActorsDropdown";
import { Button } from '@material-ui/core';
import { randomize } from '../../randomize';
import { model } from '../Stage/stageModel';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.handleActorChanged = this.handleActorChanged.bind(this);
        this.handleStageClick = this.handleStageClick.bind(this);
        this.handleChangeEditMode = this.handleChangeEditMode.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.handleClearStage = this.handleClearStage.bind(this);
        this.state = {
            isEditMode: true,
            actors: [],
            selectedActor: null,
            assignedSeats: []
        };
    }
    componentDidMount() {
        Promise.all([getActors(), getAssignedSeats()])
            .then(([actors, assignedSeats]) => {
                this.setState({
                    actors,
                    assignedSeats
                });
            });
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
                    assignSeat(existing);
                } else {
                    removeSeat(existing);
                    const seatIndex = assignedSeats.indexOf(existing);
                    assignedSeats.splice(seatIndex, 1);
                }
            } else {
                if (selectedActor) {
                    const assignedSeat = {
                        actor: selectedActor,
                        id,
                        row,
                        seat
                    }
                    assignSeat(assignedSeat);
                    // TODO If something will go wrong, the state will be inconsistent with server
                    assignedSeats.push(assignedSeat);
                }
            }
            return prevState;
        });
    }
    handleGenerate() {
        const seats = model.reduce((acc, curr) => acc.concat(curr), []).map(({ id, row, seat }) => {
            return {
                id, row, seat
            };
        });
        const { actors } = this.state;
        const res = randomize(actors, seats);
        assignSeats(res);
        this.setState({
            assignedSeats: res
        });
    }
    handleClearStage() {
        clearSeats();
        this.setState({
            assignedSeats: []
        });
    }
    render() {
        const { assignedSeats, actors, selectedActor, isEditMode } = this.state;
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <h1 style={{ flex: 1 }}>Билеты{isEditMode && ' (редактирование)'}</h1>
                    <div>
                        <Button onClick={this.handleGenerate}>GEN</Button>
                        <Button onClick={this.handleClearStage}>CLEAR</Button>
                        <div>
                            <label htmlFor="edit-mode-input">
                                Режим редактирования
                        <input id="edit-mode-input" type="checkbox" checked={isEditMode} onChange={this.handleChangeEditMode} />
                            </label>
                        </div>
                        <ActorsDropdown selected={selectedActor}
                            actors={actors}
                            onChange={this.handleActorChanged} />
                        {
                            selectedActor &&
                            <div style={{ display: 'inline' }}>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    display: 'inline-block',
                                    backgroundColor: selectedActor.color
                                }}></div>
                                {selectedActor.name}
                            </div>
                        }
                    </div>
                </div>
                <Stage assignedSeats={assignedSeats} onClick={this.handleStageClick} />
            </div>
        );
    }
}

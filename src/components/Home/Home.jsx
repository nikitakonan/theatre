import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getActors, getAssignedSeats, assignSeat, removeSeat, clearSeats, assignSeats } from "../../api";
import { ActorsDropdown, Stage } from "..";
import { model } from '../Stage/stageModel';
import { randomize } from '../../randomize';
import * as actions from '../../actions';

const mapStateToProps = (state) => ({
    isEditMode: state.stage.isEditMode,
    actors: state.actors,
    selectedActor: state.stage.selectedActor
});

const mapDispatchToProps = (dispatch) => ({
    setActors: actors => dispatch(actions.setActors(actors)),
    selectActor: actor => dispatch(actions.selectActor(actor)),
    toggleEditMode: () => dispatch(actions.toggleEditMode()),
});

class Home extends Component {
    state = {
        assignedSeats: []
    }
    componentDidMount() {
        Promise.all([getActors(), getAssignedSeats()]).then(([actors, assignedSeats]) => {
            this.props.setActors(actors);
            this.setState({ assignedSeats });
        });
    }
    handleStageClick = ({ id, row, seat }) => {
        const { selectedActor } = this.props;
        if (!this.props.isEditMode) {
            this.setState(prevState => {
                const assigned = prevState.assignedSeats.find(s => s.id === id);
                if (assigned) {
                    assigned.isBought = !assigned.isBought;
                    assignSeat(assigned);
                    return prevState;
                }
                return {};
            })

            return;
        }
        this.setState(prevState => {
            const { assignedSeats } = prevState;
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
    handleGenerate = () => {
        const seats = model
            .reduce((acc, curr) => acc.concat(curr), [])
            .map(({ id, row, seat }) => {
                return {
                    id, row, seat
                };
            });
        const { actors } = this.props;
        const res = randomize(actors, seats);
        assignSeats(res);
        this.setState({
            assignedSeats: res
        });
    }
    handleClearStage = () => {
        clearSeats();
        this.setState({
            assignedSeats: []
        });
    }
    render() {
        const { isEditMode, actors, selectedActor, toggleEditMode, selectActor } = this.props;
        const { assignedSeats } = this.state;
        return (
            <div>
                <label htmlFor="edit-mode-input">
                    Режим редактирования
                    <input id="edit-mode-input" type="checkbox" checked={isEditMode} onChange={toggleEditMode} />
                </label>
                <div style={{ display: 'flex' }}>
                    <h1 style={{ flex: 1 }}>Билеты{isEditMode && ' (редактирование)'}</h1>
                    {
                        isEditMode &&
                        <div>
                            <Button onClick={this.handleGenerate}>GEN</Button>
                            <Button onClick={this.handleClearStage}>CLEAR</Button>
                            <ActorsDropdown selected={selectedActor}
                                actors={actors}
                                onChange={selectActor} />
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
                    }
                </div>
                <Stage assignedSeats={assignedSeats} onClick={this.handleStageClick} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

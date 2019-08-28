import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getActors, getAssignedSeats, assignSeat, removeSeat, clearSeats, assignSeats } from "../../api";
import { ActorsDropdown, Stage } from "..";
import { model } from '../Stage/stageModel';
import { randomize } from '../../randomize';
import * as actions from '../../actions';

const mapStateToProps = ({ stage, actors }) => ({
    actors,
    isEditMode: stage.isEditMode,
    selectedActor: stage.selectedActor
});

const mapDispatchToProps = (dispatch) => ({
    setActors: actors => dispatch(actions.setActors(actors)),
    selectActor: actor => dispatch(actions.selectActor(actor)),
    toggleEditMode: () => dispatch(actions.toggleEditMode()),
});

class Home extends Component {
    componentDidMount() {
        getActors().then(this.props.setActors);
    }
    render() {
        const { isEditMode, toggleEditMode } = this.props;
        const { actors, selectedActor, selectActor } = this.props;
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
                <Stage />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

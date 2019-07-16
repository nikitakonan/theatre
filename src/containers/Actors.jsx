import React from 'react';
import { connect } from "react-redux";
import { ActorList, AddActor } from "../components";
import * as actions from '../actions';
import { getActors } from '../api';

class Actors extends React.Component {
    componentDidMount() {
        getActors().then(this.props.setActors);
    }
    render() {
        const { actors } = this.props;
        return (
            <div>
                <AddActor onAdd={() => { }} />
                <ActorList actors={actors} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    actors: state.actors
});

const mapDispatchToProps = dispatch => ({
    setActors: actors => {
        dispatch(actions.setActors(actors));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
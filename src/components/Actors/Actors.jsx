import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actor } from "./Actor";
import { AddActor } from "./AddActor";
import './actors.css';
import { addActor, getActors } from "../../api";

class Actors extends Component {
    componentDidMount() {
        getActors().then(actors => {
            this.props.dispatch({
                type: 'ACTORS_LOADED',
                actors
            });
        });
    }
    handleAddActor = actor => {
        addActor(actor).then(() => {
            this.props.dispatch({
                type: 'ADD_ACTOR',
                actor
            });
        });
    }
    render() {
        const { actors } = this.props;
        return (
            <section className="actors">
                <AddActor onAdd={this.handleAddActor} />
                <ol>
                    {actors.map((actor) => (
                        <li key={actor.id}>
                            <Actor {...actor} />
                        </li>
                    ))}
                </ol>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors
    }
};

export default connect(mapStateToProps)(Actors);
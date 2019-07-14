import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actor } from "./Actor";
import { AddActor } from "./AddActor";
import { addActor, getActors } from "../../api";
import * as actions from '../../actions';
import './actors.css';

class Actors extends Component {
    componentDidMount() {
        getActors().then(actors => {
            this.props.dispatch(actions.setActors(actors));
        });
    }
    handleAddActor = actor => {
        addActor(actor).then(() => {
            this.props.dispatch(actions.addActor(actor));
        });
    }
    render() {
        return (
            <section className="actors">
                <AddActor onAdd={this.handleAddActor} />
                <ol>
                    {this.props.actors.map((actor) => (
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
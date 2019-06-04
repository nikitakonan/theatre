import React, { Component } from 'react';
import { Actor } from "./Actor";
import { AddActor } from "./AddActor";
import './actors.css';
import { addActor, getActors } from "../../api";

export class Actors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: []
        };
    }
    componentDidMount() {
        getActors().then(actors => {
            this.setState({
                actors
            });
        });
    }
    handleAddActor(actor) {
        addActor(actor).then(() => {
            this.setState({
                actors: [
                    ...this.state.actors,
                    actor
                ]
            });
        });
    }
    render() {
        let { actors } = this.state;
        return (
            <section className="actors">
                <AddActor onAdd={this.handleAddActor.bind(this)}/>
                <ol>
                    {actors.map((actor) => (
                        <li key={actor.id}>
                            <Actor {...actor}/>
                        </li>
                    ))}
                </ol>
            </section>
        );
    }
}

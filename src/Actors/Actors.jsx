import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actor } from "./Actor";
import { AddActor } from "./AddActor";
import './actors.css';

export class Actors extends Component {
    handleAddActor(actor) {
        const { onAdd } = this.props;
        typeof onAdd === 'function' && onAdd(actor);
    }
    render() {
        let { actors } = this.props;
        return (
            <section className="actors">
                <AddActor onAdd={this.handleAddActor.bind(this)}/>
                <ol>
                    {actors.map((actor) => (
                        <li key={actor.name}>
                            <Actor {...actor}/>
                        </li>
                    ))}
                </ol>
            </section>
        );
    }
}

Actors.propTypes = { actors: PropTypes.array };

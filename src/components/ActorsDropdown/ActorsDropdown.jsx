import React, { Component } from 'react';

export class ActorsDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: []
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            actors: [
                {
                    id: 'unique_key',
                    name: 'Отмена',
                    value: ''
                },
                ...props.actors
            ]
        }
    }
    handleActorChanged = event => {
        const { onChange } = this.props;
        const { actors } = this.state;
        const id = event.target.value;
        const actor = id === 'unique_key' ? null : actors.find(a => a.id === id);
        typeof onChange === 'function' && onChange(actor);
    }
    render() {
        const { selected } = this.props;
        const { actors } = this.state;
        return (
            <select value={selected ? selected.id : 'unique_key'}
                onChange={this.handleActorChanged}>
                {actors.map(actor =>
                    <option key={actor.id} value={actor.id}>{actor.name}</option>
                )}
            </select>
        );
    }
}
